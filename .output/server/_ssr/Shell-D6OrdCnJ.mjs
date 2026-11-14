import { t as supabase } from "./client-C8OKaGkH.mjs";
import { i as useQueryClient, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { p as LogOut } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Brand-4dpmDfhd.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Shell-D6OrdCnJ.js
var import_jsx_runtime = require_jsx_runtime();
function Shell({ nav, children }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			search: { role: "owner" },
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [nav?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					activeProps: { className: "bg-accent text-primary" },
					className: "rounded-xl px-3.5 py-2 font-mono text-[10px] font-bold tracking-[.14em] text-muted-foreground hover:bg-accent hover:text-primary",
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: signOut,
					className: "inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 font-mono text-[10px] font-bold tracking-[.14em] text-primary hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "SIGN OUT"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "paper-grid min-h-[calc(100vh-84px)] border-t border-border px-5 py-10 sm:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl",
				children
			})
		})]
	});
}
function PageHead({ eyebrow, title, lead }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] font-bold tracking-[.18em] text-gold",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-editorial text-4xl font-bold leading-tight tracking-[-.035em] text-primary sm:text-5xl",
				children: title
			}),
			lead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground",
				children: lead
			})
		]
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-3xl border border-border bg-card p-6 sm:p-7 ${className}`,
		children
	});
}
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-2 block font-mono text-[10px] font-bold tracking-[.16em] text-muted-foreground",
		children
	});
}
var inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary";
var buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-[11px] font-bold tracking-[.14em] text-primary-foreground transition hover:opacity-90 disabled:opacity-50";
var ghostButtonClass = "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 font-mono text-[10px] font-bold tracking-[.14em] text-primary transition hover:bg-accent disabled:opacity-50";
//#endregion
export { buttonClass as a, Shell as i, Label as n, ghostButtonClass as o, PageHead as r, inputClass as s, Card as t };
