import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as LoaderCircle, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Brand-4dpmDfhd.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./auth-CGpiNHzQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-T5Xlx76C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roleCopy = {
	owner: {
		label: "Farmer / Pet Owner",
		blurb: "Keep every animal's vaccinations, records and requests in one place."
	},
	vet: {
		label: "Doctor / Veterinarian",
		blurb: "Receive animal cases, review photos and record professional care."
	}
};
function AuthPage() {
	const { role } = Route.useSearch();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/dashboard",
				replace: true
			});
		});
	}, [navigate]);
	async function handleSubmit(event) {
		event.preventDefault();
		setBusy(true);
		setError(null);
		setNotice(null);
		try {
			if (mode === "signup") {
				if (role === "vet") {
					setError("Veterinarian accounts must be created by a JeevRakshak administrator. Please sign in with your invited account or contact your administrator.");
					return;
				}
				const { data, error: signUpError } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/dashboard`,
						data: {
							full_name: fullName,
							phone,
							role: "owner"
						}
					}
				});
				if (signUpError) throw signUpError;
				if (!data.session) {
					setNotice("Account created. Please sign in to continue.");
					setMode("signin");
					return;
				}
				navigate({
					to: "/dashboard",
					replace: true
				});
				return;
			}
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (signInError) throw signInError;
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (submitError) {
			const message = submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.";
			setError(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-5 py-5 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[.12em] text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "BACK"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "paper-grid min-h-[calc(100vh-84px)] border-t border-border px-5 py-12 sm:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-7 sm:p-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] font-bold tracking-[.18em] text-gold",
						children: roleCopy[role].label.toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-editorial text-4xl font-bold leading-tight tracking-[-.03em] text-primary",
						children: mode === "signin" ? "Welcome back." : "Create your account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
						children: roleCopy[role].blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex rounded-xl border border-border p-1",
						children: ["signin", "signup"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode(value);
								setError(null);
								setNotice(null);
							},
							className: `flex-1 rounded-lg px-3 py-2 text-[11px] font-extrabold tracking-[.12em] transition-colors ${mode === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`,
							children: value === "signin" ? "SIGN IN" : "SIGN UP"
						}, value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full name",
								value: fullName,
								onChange: setFullName,
								type: "text",
								required: true,
								autoComplete: "name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone (optional)",
								value: phone,
								onChange: setPhone,
								type: "tel",
								autoComplete: "tel"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								value: email,
								onChange: setEmail,
								type: "email",
								required: true,
								autoComplete: "email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Password",
								value: password,
								onChange: setPassword,
								type: "password",
								required: true,
								autoComplete: mode === "signin" ? "current-password" : "new-password"
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl bg-destructive/10 px-4 py-3 text-[13px] text-destructive",
								children: error
							}),
							notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl bg-accent px-4 py-3 text-[13px] text-accent-foreground",
								children: notice
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: busy,
								className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-[12px] font-extrabold tracking-[.12em] text-primary-foreground disabled:opacity-60",
								children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-[13px] text-muted-foreground",
						children: [
							"Need to report an injured animal right now?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/report",
								className: "font-semibold text-primary underline underline-offset-4",
								children: "Do it without an account"
							}),
							"."
						]
					})
				]
			})
		})]
	});
}
function Field({ label, value, onChange, type, required, autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[10px] font-bold tracking-[.16em] text-muted-foreground",
			children: label.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus:border-primary",
			value,
			onChange: (event) => onChange(event.target.value),
			type,
			required,
			autoComplete
		})]
	});
}
//#endregion
export { AuthPage as component };
