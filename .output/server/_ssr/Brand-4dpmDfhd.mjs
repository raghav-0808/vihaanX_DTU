import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as PawPrint, s as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Brand-4dpmDfhd.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid h-11 w-11 place-items-center overflow-hidden rounded-[14px] bg-primary text-primary-foreground shadow-[0_7px_0_var(--color-gold)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "absolute h-7 w-7 opacity-35" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "relative h-5 w-5" })]
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-editorial text-[21px] font-bold leading-none tracking-[-.04em] text-primary",
			children: "JeevRakshak"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-mono text-[9px] font-medium tracking-[.19em] text-muted-foreground",
			children: "CARE • COORDINATED"
		})] })]
	});
}
//#endregion
export { Logo as t };
