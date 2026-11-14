import { z } from "zod";

/**
 * Server-only veterinary AI assessment through the Gemini API.
 * Never import this from client code.
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

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
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("AI is not configured. Add GEMINI_API_KEY to the server environment.");
  }

  const prompt = [
    input.species ? `Animal / species: ${input.species}` : "Animal / species: not stated",
    `What the person reports: ${input.description}`,
    input.extraContext ? `Additional record context: ${input.extraContext}` : "",
    input.imageDataUrl
      ? "A photo of the animal is attached — describe what you can actually see in it."
      : "No photo was provided.",
    "Give a preliminary triage assessment as JSON matching the schema.",
  ]
    .filter(Boolean)
    .join("\n");
  const parts: Record<string, unknown>[] = [{ text: prompt }];

  if (input.imageDataUrl) {
    const dataUrlMatch = input.imageDataUrl.match(/^data:([^;,]+);base64,([\s\S]*)$/);
    if (input.imageDataUrl.startsWith("data:") && !dataUrlMatch) {
      throw new Error("The attached image must be a base64-encoded data URL.");
    }
    parts.push({
      inlineData: {
        mimeType: dataUrlMatch?.[1] ?? "image/jpeg",
        data: dataUrlMatch?.[2] ?? input.imageDataUrl,
      },
    });
  }

  let response: Response;
  try {
    response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts }],
        generationConfig: {
          responseFormat: {
            text: {
              mimeType: "APPLICATION_JSON",
              schema: SCHEMA,
            },
          },
          temperature: 0.2,
        },
      }),
    });
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new Error("AI assessment timed out. Please try again.");
    }
    throw new Error("The Gemini AI service could not be reached. Please try again.");
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string; status?: string };
    } | null;
    const providerMessage = body?.error?.message;
    console.error(
      `[AI] Gemini returned HTTP ${response.status}${body?.error?.status ? ` (${body.error.status})` : ""}: ${providerMessage ?? "No error details returned."}`,
    );
    if (response.status === 429) {
      throw new Error(
        "Gemini quota or rate limit reached. Check the API quota in Google AI Studio.",
      );
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Gemini rejected the API key or the API is disabled. Check GEMINI_API_KEY and the Google AI Studio project.",
      );
    }
    if (response.status === 400) {
      throw new Error(
        "Gemini rejected the assessment request. Check the Gemini model and response format configuration.",
      );
    }
    if (response.status === 404) {
      throw new Error("The configured Gemini model was not found. Check the model name.");
    }
    throw new Error(
      "The Gemini AI service is temporarily unavailable. Please try again or contact a veterinarian.",
    );
  }

  let payload: {
    candidates?: { content?: { parts?: { text?: unknown }[] } }[];
  };
  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    throw new Error("Gemini returned an unreadable response. Please try again.");
  }

  const text =
    payload.candidates?.[0]?.content?.parts
      ?.map((part) => (typeof part.text === "string" ? part.text : ""))
      .join("") ?? "";
  if (!text.trim()) throw new Error("Gemini could not produce an assessment. Please try again.");

  try {
    return AssessmentSchema.parse(JSON.parse(extractJson(text)));
  } catch {
    throw new Error("Gemini returned an unreadable assessment. Please try again.");
  }
}
