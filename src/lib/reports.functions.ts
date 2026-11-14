import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ImageDataUrlSchema = z
  .string()
  .max(8_000_000)
  .regex(/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/)
  .refine((value) => {
    try {
      const base64 = value.split(",", 2)[1] ?? "";
      return base64.length % 4 === 0 && atob(base64).length <= 5 * 1024 * 1024;
    } catch {
      return false;
    }
  }, "The image data is invalid or too large.")
  .optional()
  .nullable();

const ReportInput = z.object({
  species: z.string().min(1).max(60),
  description: z.string().min(10).max(4000),
  reporterName: z.string().max(120).optional().nullable(),
  reporterPhone: z.string().max(30).optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  imageDataUrl: ImageDataUrlSchema,
});
type ReportInputType = z.infer<typeof ReportInput>;

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = crypto.getRandomValues(new Uint8Array(6));
  let out = "";
  for (const byte of random) out += chars[byte % chars.length];
  return `JR-${out}`;
}

async function createCase(data: ReportInputType, reporterId: string | null) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  let photoPath: string | null = null;
  if (data.imageDataUrl) {
    const [header, base64] = data.imageDataUrl.split(",");
    const mimeType = header?.slice(5, header.indexOf(";")) ?? "image/jpeg";
    const bytes = Uint8Array.from(atob(base64 ?? ""), (c) => c.charCodeAt(0));
    if (bytes.byteLength > 5 * 1024 * 1024)
      throw new Error("The processed image is too large. Please choose a smaller image.");
    const extension = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
    photoPath = `cases/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabaseAdmin.storage
      .from("animal-photos")
      .upload(photoPath, bytes, { contentType: mimeType, upsert: false });
    if (error) {
      if (/fetch failed|network|enotfound|econnrefused|timeout/i.test(error.message)) {
        throw new Error(
          "Cannot reach Supabase Storage. Check that SUPABASE_URL is the current URL for your active Supabase project, then restart the app and try again.",
        );
      }
      throw new Error(`Could not store the report photo: ${error.message}`);
    }
  }

  const { assessAnimal } = await import("./ai.server");
  let assessment = null;
  let assessmentError: string | null = null;
  try {
    assessment = await assessAnimal({
      species: data.species,
      description: data.description,
      imageDataUrl: data.imageDataUrl ?? null,
    });
  } catch (error) {
    assessmentError = error instanceof Error ? error.message : "AI assessment unavailable.";
  }

  let trackingCode = makeCode();
  let inserted: { id: string } | null = null;
  for (let attempt = 0; attempt < 4 && !inserted; attempt++) {
    const { data: row, error } = await supabaseAdmin
      .from("cases")
      .insert({
        tracking_code: trackingCode,
        reporter_id: reporterId,
        reporter_name: data.reporterName ?? null,
        reporter_phone: data.reporterPhone ?? null,
        species: data.species,
        description: data.description,
        photo_url: photoPath,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        address: data.address ?? null,
        urgency: assessment?.urgency ?? null,
        ai_assessment: assessment ? JSON.parse(JSON.stringify(assessment)) : null,
      })
      .select("id")
      .single();
    if (error) {
      if (error.code === "23505") {
        trackingCode = makeCode();
        continue;
      }
      throw new Error(`Could not save the report: ${error.message}`);
    }
    inserted = row;
  }
  if (!inserted) throw new Error("Could not save the report. Please try again.");

  let photoUrl: string | null = null;
  if (photoPath) {
    const { data: signed } = await supabaseAdmin.storage
      .from("animal-photos")
      .createSignedUrl(photoPath, 60 * 60 * 24 * 7);
    photoUrl = signed?.signedUrl ?? null;
  }

  return { trackingCode, assessment, assessmentError, photoUrl };
}

export const submitGuestReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ReportInput.parse(input))
  .handler(async ({ data }) => createCase(data, null));

export const submitOwnerReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ReportInput.parse(input))
  .handler(async ({ data, context }) => createCase(data, context.userId));

export const getCaseByCode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ code: z.string().min(4).max(20) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("cases")
      .select(
        "tracking_code, species, description, status, urgency, ai_assessment, photo_url, address, created_at",
      )
      .eq("tracking_code", data.code.trim().toUpperCase())
      .maybeSingle();
    if (!row) return null;

    let photoUrl: string | null = null;
    if (row.photo_url) {
      const { data: signed } = await supabaseAdmin.storage
        .from("animal-photos")
        .createSignedUrl(row.photo_url, 60 * 60 * 24);
      photoUrl = signed?.signedUrl ?? null;
    }
    return { ...row, photoUrl };
  });

export const signCasePhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ path: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed } = await context.supabase
      .from("cases")
      .select("id")
      .eq("photo_url", data.path)
      .limit(1);
    if (!allowed || allowed.length === 0) return { url: null };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed } = await supabaseAdmin.storage
      .from("animal-photos")
      .createSignedUrl(data.path, 60 * 60);
    return { url: signed?.signedUrl ?? null };
  });

export const assessAnimalHealth = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        species: z.string().max(60).optional().nullable(),
        description: z.string().min(10).max(4000),
        extraContext: z.string().max(4000).optional().nullable(),
        imageDataUrl: ImageDataUrlSchema,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { assessAnimal } = await import("./ai.server");
    return assessAnimal({
      species: data.species ?? null,
      description: data.description,
      extraContext: data.extraContext ?? null,
      imageDataUrl: data.imageDataUrl ?? null,
    });
  });
