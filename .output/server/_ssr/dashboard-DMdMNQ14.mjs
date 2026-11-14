import { t as supabase } from "./client-C8OKaGkH.mjs";
import { n as useQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { n as VET_NAV, t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DMdMNQ14.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { data, isPending, error } = useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			const user = userData.user;
			if (!user) throw new Error("No signed-in user");
			const [profileResult, rolesResult] = await Promise.all([supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", user.id)]);
			if (profileResult.error || rolesResult.error) throw new Error("We couldn't load your account details. Please refresh and try again.");
			const profile = profileResult.data;
			const isVet = (rolesResult.data ?? []).some((row) => row.role === "vet");
			return {
				email: user.email ?? "",
				fullName: profile?.full_name ?? "",
				role: isVet ? "vet" : "owner"
			};
		}
	});
	const sections = data?.role === "vet" ? vetSections : ownerSections;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: data?.role === "vet" ? VET_NAV : OWNER_NAV,
		children: [
			isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading your workspace…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
				children: "We couldn't load your account details. Please refresh and try again."
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] font-bold tracking-[.18em] text-gold",
					children: data.role === "vet" ? "CLINICAL DESK" : "OWNER WORKSPACE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-editorial text-5xl font-bold leading-tight tracking-[-.035em] text-primary",
					children: data.fullName ? `Welcome, ${data.fullName.split(" ")[0]}.` : "Welcome."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground",
					children: [
						"Signed in as ",
						data.email,
						". Your animals, records and cases are saved to your account and stay with you on every device."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: section.to,
						className: "rounded-3xl border border-border bg-card p-7 transition hover:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-editorial text-[24px] font-bold tracking-[-.03em] text-primary",
								children: section.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[14px] leading-relaxed text-muted-foreground",
								children: section.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 font-mono text-[10px] font-bold tracking-[.16em] text-gold",
								children: "OPEN →"
							})
						]
					}, section.title))
				}),
				data.role === "owner" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[15px] leading-relaxed text-muted-foreground",
						children: [
							"Anyone can report an injured street animal without an account through the public",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/report",
								className: "mx-1 text-primary underline",
								children: "Help an Animal"
							}),
							"page."
						]
					})
				})
			] })
		]
	});
}
var ownerSections = [
	{
		title: "Farmer Portal",
		body: "Your overview: animals, vaccinations due and active requests.",
		to: "/portal"
	},
	{
		title: "My Animals",
		body: "Add each animal with a photo, breed, age and health notes.",
		to: "/animals"
	},
	{
		title: "Vaccinations & Records",
		body: "Vaccines given, next due dates and past treatments.",
		to: "/records"
	},
	{
		title: "AI Health Assistant",
		body: "Describe symptoms and share a photo for a preliminary read.",
		to: "/assistant"
	},
	{
		title: "Emergency Assistance",
		body: "Request a veterinarian and follow the case status live.",
		to: "/requests"
	},
	{
		title: "Previous Requests",
		body: "Everything you have reported, with its current status.",
		to: "/requests"
	}
];
var vetSections = [
	{
		title: "Doctor Portal",
		body: "Incoming cases, priorities and your active caseload.",
		to: "/vet-portal"
	},
	{
		title: "Incoming Cases",
		body: "New animal reports arriving from owners and the public.",
		to: "/cases"
	},
	{
		title: "Case Details",
		body: "Photos, symptoms, description and location for each report.",
		to: "/cases"
	},
	{
		title: "Status Updates",
		body: "Accept, decline, and move a case through to resolved.",
		to: "/cases"
	},
	{
		title: "Clinical Notes",
		body: "Record treatment given and recommendations for the owner.",
		to: "/cases"
	}
];
//#endregion
export { Dashboard as component };
