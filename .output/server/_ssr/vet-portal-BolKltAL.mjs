import { t as supabase } from "./client-C8OKaGkH.mjs";
import { n as useQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, r as PageHead, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { n as VET_NAV } from "./nav-BjJUczmA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vet-portal-BolKltAL.js
var import_jsx_runtime = require_jsx_runtime();
function VetPortal() {
	const { data, isPending, error } = useQuery({
		queryKey: ["vet-portal"],
		queryFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			const user = userData.user;
			if (!user) throw new Error("No signed-in user");
			const { data: cases } = await supabase.from("cases").select("id, tracking_code, species, description, status, urgency, address, assigned_vet_id, created_at").order("created_at", { ascending: false });
			const all = cases ?? [];
			return {
				all,
				incoming: all.filter((c) => c.status === "new"),
				mine: all.filter((c) => c.assigned_vet_id === user.id && c.status !== "closed"),
				high: all.filter((c) => (c.urgency ?? "").toLowerCase() === "high" && c.status !== "resolved" && c.status !== "closed"),
				resolved: all.filter((c) => c.status === "resolved" || c.status === "closed")
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: VET_NAV,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				eyebrow: "CLINICAL DESK",
				title: "Every case, in priority order.",
				lead: "New reports, the animals already under your care, and everything you have brought to a close."
			}),
			isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading your portal…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
				children: "We couldn't load the case data. Please refresh and try again."
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.incoming.length,
							label: "Incoming cases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.high.length,
							label: "High priority"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.mine.length,
							label: "Assigned to you"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							value: data.resolved.length,
							label: "Resolved"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-5 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "New reports" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseList, {
						items: data.incoming,
						empty: "No new reports right now."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "Your active caseload" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseList, {
						items: data.mine,
						empty: "You have not accepted any cases yet."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[15px] leading-relaxed text-muted-foreground",
						children: [
							"Open the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cases",
								className: "text-primary underline",
								children: "case queue"
							}),
							" ",
							"to view photos, location and the preliminary AI assessment, update a status and add clinical notes."
						]
					})
				})
			] })
		]
	});
}
function CaseList({ items, empty }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-[14px] text-muted-foreground",
		children: empty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-4",
		children: items.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "border-b border-border pb-4 last:border-0 last:pb-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] font-semibold text-primary",
						children: c.species
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold tracking-[.12em] text-accent-foreground",
						children: c.status.replace("_", " ").toUpperCase()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground",
					children: c.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-[10px] tracking-[.12em] text-muted-foreground",
					children: [c.tracking_code, c.address ? ` · ${c.address}` : ""]
				})
			]
		}, c.id))
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
function SectionTitle({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-editorial text-[22px] font-bold tracking-[-.03em] text-primary",
		children: title
	});
}
//#endregion
export { VetPortal as component };
