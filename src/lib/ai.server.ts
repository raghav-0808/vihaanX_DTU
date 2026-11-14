import { z } from "zod";

/**
 * Server-only veterinary AI assessment through the Lovable AI Gateway.
 * Never import this from client code.
 */

const GATEWAY = "https://ai.gateway.lovable.dev/v1/responses";
const MODEL = "openai/gpt-6-astra";
const DEFAULT_OLLAMA_MODEL = "qwen2.5vl:3b";

export interface Assessment {
  animal_observed: string;
  condition_summary: string;
  likely_conditions: { name: string; reasoning: string; confidence: "low" | "medium" | "high" }[];
  urgency: "low" | "moderate" | "high" | "critical";
  vet_required: boolean;
  immediate_actions: string[];
  warning_signs: string[];
  questions_for_owner: string[];
}

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "animal_observed",
    "condition_summary",
    "likely_conditions",
    "urgency",
    "vet_required",
    "immediate_actions",
    "warning_signs",
    "questions_for_owner",
  ],
  properties: {
    animal_observed: { type: "string" },
    condition_summary: { type: "string" },
    likely_conditions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "reasoning", "confidence"],
        properties: {
          name: { type: "string" },
          reasoning: { type: "string" },
          confidence: { type: "string", enum: ["low", "medium", "high"] },
        },
      },
    },
    urgency: { type: "string", enum: ["low", "moderate", "high", "critical"] },
    vet_required: { type: "boolean" },
    immediate_actions: { type: "array", items: { type: "string" } },
    warning_signs: { type: "array", items: { type: "string" } },
    questions_for_owner: { type: "array", items: { type: "string" } },
  },
} as const;

const SYSTEM = `You are a veterinary triage assistant for JeevRakshak, used in rural and semi-urban India by
livestock farmers, pet owners and good samaritans who find injured street animals.

Knowledge and method:
- Reason from the SPECIFIC details given: species, age, duration, observed signs, and anything visible in the photo.
- Common Indian livestock and companion animal concerns: foot-and-mouth disease, haemorrhagic septicaemia, mastitis,
  bloat/tympany, milk fever, tick fever/babesiosis, trypanosomiasis, black quarter, PPR in goats, rabies exposure,
  canine distemper, parvovirus, mange, maggot wounds (myiasis), heat stress, snake bite, road traffic injuries,
  poisoning (organophosphate), foreign body ingestion, dystocia, prolapse, and parasitic loads.
- Weigh red flags: bleeding that will not stop, inability to stand, laboured breathing, seizures, bloated abdomen,
  suspected rabies (aggression, salivation, bite history), advanced maggot infestation, prolonged straining in labour.
- Be honest about uncertainty; give low confidence when the input is thin, and ask for the specific missing detail.
- Immediate actions must be safe first-aid a non-expert can do (shade, water, wound cleaning, safe restraint,
  isolation, transport advice). Never prescribe prescription drugs, dosages, or surgical steps.
- Vary your answer with the input. Two different animals or symptoms must never yield the same assessment.
- Treat image observations as uncertain visual descriptions, not a diagnosis. If the image is unclear, say so.
- Write plainly, short sentences, no jargon without explanation.`;

const AssessmentSchema = z.object({
  animal_observed: z.string(),
  condition_summary: z.string(),
  likely_conditions: z.array(
    z.object({
      name: z.string(),
      reasoning: z.string(),
      confidence: z.enum(["low", "medium", "high"]),
    }),
  ),
  urgency: z.enum(["low", "moderate", "high", "critical"]),
  vet_required: z.boolean(),
  immediate_actions: z.array(z.string()),
  warning_signs: z.array(z.string()),
  questions_for_owner: z.array(z.string()),
});

function extractJson(text: string): string {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence?.[1]) return fence[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

export interface AssessInput {
  species?: string | null;
  description: string;
  extraContext?: string | null;
  /** data URL or bare base64 JPEG/PNG */
  imageDataUrl?: string | null;
}

export async function assessAnimal(input: AssessInput): Promise<Assessment> {
  const parts: Record<string, unknown>[] = [
    {
      type: "input_text",
      text: [
        input.species ? `Animal / species: ${input.species}` : "Animal / species: not stated",
        `What the person reports: ${input.description}`,
        input.extraContext ? `Additional record context: ${input.extraContext}` : "",
        input.imageDataUrl
          ? "A photo of the animal is attached — describe what you can actually see in it."
          : "No photo was provided.",
        "Give a preliminary triage assessment as JSON matching the schema.",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ];
  if (input.imageDataUrl) {
    const url = input.imageDataUrl.startsWith("data:")
      ? input.imageDataUrl
      : `data:image/jpeg;base64,${input.imageDataUrl}`;
    parts.push({ type: "input_image", image_url: url });
  }

  const ollamaUrl = process.env["OLLAMA_BASE_URL"]?.replace(/\/+$/, "");
  if (ollamaUrl) {
    return assessWithOllama(input, String(parts[0]?.["text"] ?? ""), ollamaUrl);
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new Error(
      "AI is not configured. Set OLLAMA_BASE_URL for a local Ollama vision model or configure LOVABLE_API_KEY.",
    );
  }

  let res: Response;
  try {
    res = await fetch(GATEWAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      signal: AbortSignal.timeout(45_000),
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        instructions: SYSTEM,
        input: [{ role: "user", content: parts }],
        reasoning: { effort: "low", summary: "auto" },
        store: false,
        text: {
          format: {
            type: "json_schema",
            name: "veterinary_assessment",
            strict: true,
            schema: SCHEMA,
          },
        },
      }),
    });
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new Error("AI assessment timed out. Please try again.");
    }
    throw new Error(
      "The AI assessment service could not be reached. Check your connection and try again.",
    );
  }

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 429)
      throw new Error("The AI assistant is busy right now. Please try again in a minute.");
    if (res.status === 402)
      throw new Error("AI credits for this app have run out. The app owner needs to add credits.");
    console.error(`[AI] Assessment provider returned HTTP ${res.status}.`);
    throw new Error(
      "The AI assessment service is temporarily unavailable. Please try again or contact a veterinarian.",
    );
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("AI assessment returned no response.");
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let streamError: string | null = null;

  function consumeEvent(line: string) {
    if (!line.startsWith("data:")) return;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") return;
    try {
      const evt = JSON.parse(payload) as {
        type?: string;
        delta?: string;
        response?: { output_text?: string; error?: { message?: string } };
        error?: { message?: string };
      };
      if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
        text += evt.delta;
      } else if (evt.type === "response.completed" && evt.response?.output_text && !text) {
        text = evt.response.output_text;
      } else if (evt.type === "error" || evt.type === "response.failed") {
        streamError =
          evt.error?.message ??
          evt.response?.error?.message ??
          "AI provider failed to complete the assessment.";
      }
    } catch {
      // Ignore incomplete or keep-alive frames; the final partial frame is parsed below.
    }
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) consumeEvent(line);
    }
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new Error("AI assessment timed out. Please try again.");
    }
    throw new Error("The AI assessment stream was interrupted. Please try again.");
  }
  if (buffer.trim()) consumeEvent(buffer.trim());
  if (streamError)
    throw new Error("The AI assessment service could not complete this request. Please try again.");

  if (!text.trim())
    throw new Error("The AI assistant could not produce an assessment. Please try again.");

  try {
    return AssessmentSchema.parse(JSON.parse(extractJson(text)));
  } catch {
    throw new Error("The AI assistant returned an unreadable answer. Please try again.");
  }
}

async function assessWithOllama(
  input: AssessInput,
  prompt: string,
  baseUrl: string,
): Promise<Assessment> {
  const model = process.env["OLLAMA_VISION_MODEL"] || DEFAULT_OLLAMA_MODEL;
  const images = input.imageDataUrl
    ? [
        input.imageDataUrl.startsWith("data:")
          ? (input.imageDataUrl.split(",", 2)[1] ?? "")
          : input.imageDataUrl,
      ]
    : undefined;

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(180_000),
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: prompt, ...(images ? { images } : {}) },
        ],
        format: SCHEMA,
        options: { temperature: 0 },
      }),
    });
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new Error("The local AI model took too long. Try again or use a smaller Ollama model.");
    }
    throw new Error(
      `Cannot reach Ollama at ${baseUrl}. Start Ollama and ensure the ${model} model is installed.`,
    );
  }

  if (!response.ok) {
    console.error(`[AI] Local Ollama returned HTTP ${response.status}.`);
    throw new Error(
      `The local AI model could not complete this assessment. Check that Ollama is running and the ${model} model is installed.`,
    );
  }

  try {
    const payload = (await response.json()) as { message?: { content?: unknown } };
    if (typeof payload.message?.content !== "string" || !payload.message.content.trim()) {
      throw new Error("Empty AI response");
    }
    return AssessmentSchema.parse(JSON.parse(extractJson(payload.message.content)));
  } catch {
    throw new Error("The local AI model returned an unreadable assessment. Please try again.");
  }
}
