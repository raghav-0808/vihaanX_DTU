import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as TriangleAlert, s as ShieldCheck } from "../_libs/lucide-react.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-By6h9iJb.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports.functions-kOaDYgr3.js
var import_jsx_runtime = require_jsx_runtime();
var urgencyTone = {
	low: "bg-accent text-primary",
	moderate: "bg-gold/20 text-gold-foreground",
	high: "bg-gold/35 text-gold-foreground",
	critical: "bg-destructive/15 text-destructive"
};
function AssessmentView({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[.16em] uppercase ${urgencyTone[data.urgency] ?? "bg-accent text-primary"}`,
					children: ["URGENCY: ", data.urgency]
				}), data.vet_required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[.16em] text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" }), "SEE A VETERINARIAN"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-editorial text-[22px] font-bold tracking-[-.03em] text-primary",
					children: "What we see"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[15px] leading-relaxed text-foreground",
					children: data.animal_observed
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[15px] leading-relaxed text-foreground",
					children: data.condition_summary
				})
			] }),
			data.likely_conditions?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-editorial text-[22px] font-bold tracking-[-.03em] text-primary",
				children: "Possible causes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: data.likely_conditions.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-border bg-background p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[15px] font-bold text-primary",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] tracking-[.14em] text-muted-foreground uppercase",
							children: [c.confidence, " confidence"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-[14px] leading-relaxed text-muted-foreground",
						children: c.reasoning
					})]
				}, i))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
				title: "Do this now",
				items: data.immediate_actions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
				title: "Warning signs to watch",
				items: data.warning_signs
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
				title: "Helpful details to add",
				items: data.questions_for_owner
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 border-t border-border pt-5 text-[13px] leading-relaxed text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), "This is a preliminary AI assessment and does not replace examination by a qualified veterinarian."]
			})
		]
	});
}
function ListBlock({ title, items }) {
	if (!items?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-editorial text-[22px] font-bold tracking-[-.03em] text-primary",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 space-y-2",
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 text-[15px] leading-relaxed text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" }), item]
		}, i))
	})] });
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var submitGuestReport = createServerFn({ method: "POST" }).inputValidator((input) => ReportInput.parse(input)).handler(createSsrRpc("8621b042da3fb1aca4031bd6b8f55d63e4bcbbb09e8f2f6bae283068f4e1d7d4"));
var submitOwnerReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ReportInput.parse(input)).handler(createSsrRpc("89e6f2df1b81a464ca47076d7f661ce88b58b2dbdc3d577f75926d5c127f6e1a"));
var getCaseByCode = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ code: stringType().min(4).max(20) }).parse(input)).handler(createSsrRpc("18b0ebc8010abaaea5e61a920ecf427f13634925a9ad70027fdf21188f9b2ffd"));
var signCasePhoto = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ path: stringType().min(1) }).parse(input)).handler(createSsrRpc("2f931709ce36321fe896cfd72e1788b67dd46f405b9770fa5ef12f802b43aecb"));
var assessAnimalHealth = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	species: stringType().max(60).optional().nullable(),
	description: stringType().min(10).max(4e3),
	extraContext: stringType().max(4e3).optional().nullable(),
	imageDataUrl: ImageDataUrlSchema
}).parse(input)).handler(createSsrRpc("74c5b1c77ffd794720b68f4b492abdce1a3efa717aac9e6453fbec8f5cf491a3"));
//#endregion
export { submitGuestReport as a, signCasePhoto as i, assessAnimalHealth as n, submitOwnerReport as o, getCaseByCode as r, AssessmentView as t };
