import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports.functions-CVcw7ByH.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ImageDataUrlSchema = stringType().max(8e6).regex(/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/).refine((value) => {
	try {
		const base64 = value.split(",", 2)[1] ?? "";
		return base64.length % 4 === 0 && atob(base64).length <= 5242880;
	} catch {
		return false;
	}
}, "The image data is invalid or too large.").optional().nullable();
var ReportInput = objectType({
	species: stringType().min(1).max(60),
	description: stringType().min(10).max(4e3),
	reporterName: stringType().max(120).optional().nullable(),
	reporterPhone: stringType().max(30).optional().nullable(),
	address: stringType().max(300).optional().nullable(),
	latitude: numberType().optional().nullable(),
	longitude: numberType().optional().nullable(),
	imageDataUrl: ImageDataUrlSchema
});
function makeCode() {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const random = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(6));
	let out = "";
	for (const byte of random) out += chars[byte % 32];
	return `JR-${out}`;
}
async function createCase(data, reporterId) {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { assessAnimal } = await import("./ai.server-BC2c8164.mjs");
	let assessment = null;
	let assessmentError = null;
	try {
		assessment = await assessAnimal({
			species: data.species,
			description: data.description,
			imageDataUrl: data.imageDataUrl ?? null
		});
	} catch (error) {
		assessmentError = error instanceof Error ? error.message : "AI assessment unavailable.";
	}
	let photoPath = null;
	if (data.imageDataUrl) {
		const [header, base64] = data.imageDataUrl.split(",");
		const mimeType = header?.slice(5, header.indexOf(";")) ?? "image/jpeg";
		const bytes = Uint8Array.from(atob(base64 ?? ""), (c) => c.charCodeAt(0));
		if (bytes.byteLength > 5242880) throw new Error("The processed image is too large. Please choose a smaller image.");
		const extension = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
		photoPath = `cases/${crypto.randomUUID()}.${extension}`;
		const { error } = await supabaseAdmin.storage.from("animal-photos").upload(photoPath, bytes, {
			contentType: mimeType,
			upsert: false
		});
		if (error) throw new Error(`Could not store the report photo: ${error.message}`);
	}
	let trackingCode = makeCode();
	let inserted = null;
	for (let attempt = 0; attempt < 4 && !inserted; attempt++) {
		const { data: row, error } = await supabaseAdmin.from("cases").insert({
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
			ai_assessment: assessment ? JSON.parse(JSON.stringify(assessment)) : null
		}).select("id").single();
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
	let photoUrl = null;
	if (photoPath) {
		const { data: signed } = await supabaseAdmin.storage.from("animal-photos").createSignedUrl(photoPath, 604800);
		photoUrl = signed?.signedUrl ?? null;
	}
	return {
		trackingCode,
		assessment,
		assessmentError,
		photoUrl
	};
}
var submitGuestReport_createServerFn_handler = createServerRpc({
	id: "8621b042da3fb1aca4031bd6b8f55d63e4bcbbb09e8f2f6bae283068f4e1d7d4",
	name: "submitGuestReport",
	filename: "src/lib/reports.functions.ts"
}, (opts) => submitGuestReport.__executeServer(opts));
var submitGuestReport = createServerFn({ method: "POST" }).inputValidator((input) => ReportInput.parse(input)).handler(submitGuestReport_createServerFn_handler, async ({ data }) => createCase(data, null));
var submitOwnerReport_createServerFn_handler = createServerRpc({
	id: "89e6f2df1b81a464ca47076d7f661ce88b58b2dbdc3d577f75926d5c127f6e1a",
	name: "submitOwnerReport",
	filename: "src/lib/reports.functions.ts"
}, (opts) => submitOwnerReport.__executeServer(opts));
var submitOwnerReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ReportInput.parse(input)).handler(submitOwnerReport_createServerFn_handler, async ({ data, context }) => createCase(data, context.userId));
var getCaseByCode_createServerFn_handler = createServerRpc({
	id: "18b0ebc8010abaaea5e61a920ecf427f13634925a9ad70027fdf21188f9b2ffd",
	name: "getCaseByCode",
	filename: "src/lib/reports.functions.ts"
}, (opts) => getCaseByCode.__executeServer(opts));
var getCaseByCode = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ code: stringType().min(4).max(20) }).parse(input)).handler(getCaseByCode_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: row } = await supabaseAdmin.from("cases").select("tracking_code, species, description, status, urgency, ai_assessment, photo_url, address, created_at").eq("tracking_code", data.code.trim().toUpperCase()).maybeSingle();
	if (!row) return null;
	let photoUrl = null;
	if (row.photo_url) {
		const { data: signed } = await supabaseAdmin.storage.from("animal-photos").createSignedUrl(row.photo_url, 86400);
		photoUrl = signed?.signedUrl ?? null;
	}
	return {
		...row,
		photoUrl
	};
});
var signCasePhoto_createServerFn_handler = createServerRpc({
	id: "2f931709ce36321fe896cfd72e1788b67dd46f405b9770fa5ef12f802b43aecb",
	name: "signCasePhoto",
	filename: "src/lib/reports.functions.ts"
}, (opts) => signCasePhoto.__executeServer(opts));
var signCasePhoto = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ path: stringType().min(1) }).parse(input)).handler(signCasePhoto_createServerFn_handler, async ({ data, context }) => {
	const { data: allowed } = await context.supabase.from("cases").select("id").eq("photo_url", data.path).limit(1);
	if (!allowed || allowed.length === 0) return { url: null };
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: signed } = await supabaseAdmin.storage.from("animal-photos").createSignedUrl(data.path, 3600);
	return { url: signed?.signedUrl ?? null };
});
var assessAnimalHealth_createServerFn_handler = createServerRpc({
	id: "74c5b1c77ffd794720b68f4b492abdce1a3efa717aac9e6453fbec8f5cf491a3",
	name: "assessAnimalHealth",
	filename: "src/lib/reports.functions.ts"
}, (opts) => assessAnimalHealth.__executeServer(opts));
var assessAnimalHealth = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	species: stringType().max(60).optional().nullable(),
	description: stringType().min(10).max(4e3),
	extraContext: stringType().max(4e3).optional().nullable(),
	imageDataUrl: ImageDataUrlSchema
}).parse(input)).handler(assessAnimalHealth_createServerFn_handler, async ({ data }) => {
	const { assessAnimal } = await import("./ai.server-BC2c8164.mjs");
	return assessAnimal({
		species: data.species ?? null,
		description: data.description,
		extraContext: data.extraContext ?? null,
		imageDataUrl: data.imageDataUrl ?? null
	});
});
//#endregion
export { assessAnimalHealth_createServerFn_handler, getCaseByCode_createServerFn_handler, signCasePhoto_createServerFn_handler, submitGuestReport_createServerFn_handler, submitOwnerReport_createServerFn_handler };
