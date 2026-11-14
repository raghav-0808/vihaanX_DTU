import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as ArrowRight, h as HeartPulse, i as Stethoscope, s as ShieldCheck, t as UsersRound, y as Activity } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Brand-4dpmDfhd.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DuLIfVvw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var options = [
	{
		icon: UsersRound,
		title: "Farmer / Pet Owner",
		body: "Manage your animals and health records",
		cta: "CONTINUE AS OWNER",
		to: "/auth",
		search: { role: "owner" }
	},
	{
		icon: Stethoscope,
		title: "Doctor / Veterinarian",
		body: "Manage and respond to animal cases",
		cta: "CONTINUE AS VET",
		to: "/auth",
		search: { role: "vet" }
	},
	{
		icon: HeartPulse,
		title: "Help an Animal",
		body: "Report an injured animal without login",
		cta: "REPORT NOW",
		to: "/report",
		search: void 0
	}
];
function Entry() {
	const [signedIn, setSignedIn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-4 px-5 py-5 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [signedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "hidden rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[.12em] text-primary underline-offset-4 hover:underline sm:inline-flex",
					children: "MY DASHBOARD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/report",
					className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-[12px] font-extrabold tracking-[.12em] text-primary-foreground transition-transform hover:-translate-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }), "REPORT AN ANIMAL"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "paper-grid border-t border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-10 sm:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-editorial text-[13vw] font-bold leading-[0.95] tracking-[-.035em] text-primary sm:text-6xl lg:text-7xl",
						children: ["An animal needs help?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block italic text-gold",
							children: "Start here."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: "AI-assisted animal and livestock health response from first report to complete care."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: option.to,
							search: option.search,
							className: "group flex flex-col rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_var(--color-primary)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(option.icon, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-8 font-editorial text-[28px] font-bold leading-tight tracking-[-.03em] text-primary",
									children: option.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
									children: option.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-8 inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[.12em] text-gold",
									children: [option.cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
								})
							]
						}, option.title))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-card/60 px-5 py-5 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mx-auto flex max-w-6xl items-center gap-2 text-[13px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 shrink-0 text-primary" }), "AI assessment is preliminary and does not replace professional veterinary diagnosis."]
				})
			})]
		})]
	});
}
//#endregion
export { Entry as component };
