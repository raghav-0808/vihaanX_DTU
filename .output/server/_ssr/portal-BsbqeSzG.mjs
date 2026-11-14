import { t as supabase } from "./client-C8OKaGkH.mjs";
import { n as useQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, r as PageHead, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-BsbqeSzG.js
var import_jsx_runtime = require_jsx_runtime();
function FarmerPortal() {
	const { data, isPending, error } = useQuery({
		queryKey: ["farmer-portal"],
		queryFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			const user = userData.user;
			if (!user) throw new Error("No signed-in user");
			const [{ data: animals }, { data: vaccinations }, { data: cases }] = await Promise.all([
				supabase.from("animals").select("id, name, species, created_at").eq("owner_id", user.id),
				supabase.from("vaccinations").select("id, vaccine, next_due_on, animal_id").eq("owner_id", user.id).not("next_due_on", "is", null).order("next_due_on", { ascending: true }),
				supabase.from("cases").select("id, tracking_code, species, status, urgency, created_at").eq("reporter_id", user.id).order("created_at", { ascending: false })
			]);
			const animalName = new Map((animals ?? []).map((a) => [a.id, a.name]));
			const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const inThirty = new Date(Date.now() + 2592e6).toISOString().slice(0, 10);
			const due = (vaccinations ?? []).filter((v) => v.next_due_on <= inThirty);
			const openCases = (cases ?? []).filter((c) => c.status !== "resolved" && c.status !== "closed");
			return {
				animals: animals ?? [],
				due: due.map((v) => ({
					...v,
					animal: animalName.get(v.animal_id) ?? "Animal",
					overdue: v.next_due_on < today
				})),
				cases: cases ?? [],
				openCases,
				highPriority: openCases.filter((c) => (c.urgency ?? "").toLowerCase() === "high").length
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				eyebrow: "OWNER WORKSPACE",
				title: "Care, clearly coordinated.",
				lead: "See what is happening with every animal and every reported case, without having to chase updates."
			}),
			isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading your portal…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
				children: "We couldn't load your portal. Please refresh and try again."
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.animals.length,
							label: "Animals registered"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.openCases.length,
							label: "Active requests"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.highPriority,
							label: "High priority"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.due.length,
							label: "Vaccinations due"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-5 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Vaccinations coming up",
						to: "/animals",
						cta: "MANAGE ANIMALS"
					}), data.due.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[14px] text-muted-foreground",
						children: "Nothing due in the next 30 days."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: data.due.slice(0, 6).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[15px] font-semibold text-primary",
								children: v.vaccine
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] text-muted-foreground",
								children: v.animal
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `font-mono text-[10px] font-bold tracking-[.12em] ${v.overdue ? "text-destructive" : "text-gold"}`,
								children: [v.overdue ? "OVERDUE " : "DUE ", v.next_due_on]
							})]
						}, v.id))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						title: "Recent requests",
						to: "/requests",
						cta: "ALL REQUESTS"
					}), data.cases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[14px] text-muted-foreground",
						children: "No emergency requests yet. Raise one from the requests page whenever an animal needs help."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: data.cases.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[15px] font-semibold text-primary",
								children: c.species
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-muted-foreground",
								children: c.tracking_code
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold tracking-[.12em] text-accent-foreground",
								children: c.status.replace("_", " ").toUpperCase()
							})]
						}, c.id))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
							to: "/animals",
							title: "Add an animal",
							body: "Photo, breed, age and health notes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
							to: "/assistant",
							title: "Ask the AI assistant",
							body: "Describe symptoms, share a photo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
							to: "/requests",
							title: "Request a vet",
							body: "Raise an emergency and track it live."
						})
					]
				})
			] })
		]
	});
}
function Metric({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-editorial text-4xl font-bold tracking-[-.04em] text-primary",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 font-mono text-[10px] font-bold tracking-[.14em] text-muted-foreground",
			children: label.toUpperCase()
		})]
	});
}
function SectionTitle({ title, to, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-editorial text-[22px] font-bold tracking-[-.03em] text-primary",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "font-mono text-[10px] font-bold tracking-[.14em] text-gold",
			children: [cta, " →"]
		})]
	});
}
function QuickLink({ to, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "rounded-3xl border border-border bg-card p-6 transition hover:border-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-editorial text-[20px] font-bold tracking-[-.03em] text-primary",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-[14px] leading-relaxed text-muted-foreground",
			children: body
		})]
	});
}
//#endregion
export { FarmerPortal as component };
