import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, i as useQueryClient, n as useQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { f as MapPin, m as LoaderCircle, u as Phone } from "../_libs/lucide-react.mjs";
import { a as buttonClass, i as Shell, n as Label, o as ghostButtonClass, r as PageHead, s as inputClass, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { n as VET_NAV } from "./nav-BjJUczmA.mjs";
import { i as signCasePhoto, t as AssessmentView } from "./reports.functions-kOaDYgr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-B_CLhzu2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"new",
	"accepted",
	"in_progress",
	"resolved",
	"closed"
];
var statusLabel = {
	new: "NEW",
	accepted: "ACCEPTED",
	in_progress: "IN PROGRESS",
	resolved: "RESOLVED",
	closed: "CLOSED"
};
function CasesPage() {
	const queryClient = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("new");
	const [openCase, setOpenCase] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const cases = useQuery({
		queryKey: ["vet-cases", filter],
		queryFn: async () => {
			let q = supabase.from("cases").select("id, tracking_code, species, description, status, urgency, ai_assessment, photo_url, address, latitude, longitude, reporter_name, reporter_phone, created_at").order("created_at", { ascending: false });
			if (filter !== "all") q = q.eq("status", filter);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
	});
	const active = cases.data?.find((c) => c.id === openCase) ?? null;
	const photoQuery = useQuery({
		queryKey: ["vet-case-photo", active?.id],
		enabled: !!active?.photo_url,
		queryFn: async () => {
			return (await signCasePhoto({ data: { path: active.photo_url } })).url;
		}
	});
	const notes = useQuery({
		queryKey: ["vet-case-notes", active?.id],
		enabled: !!active,
		queryFn: async () => {
			const { data, error } = await supabase.from("case_notes").select("id, note, created_at").eq("case_id", active.id).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const setStatus = useMutation({
		mutationFn: async (status) => {
			const { data: userData } = await supabase.auth.getUser();
			const claim = status === "accepted" || status === "in_progress";
			const { error } = await supabase.from("cases").update(claim ? {
				status,
				assigned_vet_id: userData.user?.id ?? null
			} : { status }).eq("id", active.id);
			if (error) throw error;
		},
		onSuccess: () => {
			setError(null);
			queryClient.invalidateQueries({ queryKey: ["vet-cases"] });
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not update this case.")
	});
	const addNote = useMutation({
		mutationFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			const { error } = await supabase.from("case_notes").insert({
				case_id: active.id,
				author_id: userData.user.id,
				note: note.trim()
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setNote("");
			setError(null);
			queryClient.invalidateQueries({ queryKey: ["vet-case-notes", active?.id] });
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not save that note.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: VET_NAV,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				eyebrow: "CLINICAL DESK",
				title: "Case queue",
				lead: "Reports from farmers, pet owners and the public — with photos, location and a preliminary AI read."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex flex-wrap gap-2",
				children: ["all", ...STATUSES].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(s),
					className: `rounded-xl border px-4 py-2 font-mono text-[10px] font-bold tracking-[.14em] ${filter === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary hover:bg-accent"}`,
					children: s === "all" ? "ALL" : statusLabel[s]
				}, s))
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1fr_1.3fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						cases.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Loading cases…"
						}),
						cases.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] text-muted-foreground",
							children: "No cases in this list."
						}),
						cases.data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpenCase(c.id),
							className: `w-full rounded-3xl border bg-card p-5 text-left transition ${openCase === c.id ? "border-primary" : "border-border hover:border-primary"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] font-bold tracking-[.16em] text-gold uppercase",
										children: c.urgency ? `${c.urgency} urgency` : "UNTRIAGED"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: c.tracking_code
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[15px] font-bold text-primary",
									children: c.species
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-[14px] text-muted-foreground",
									children: c.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-mono text-[10px] tracking-[.14em] text-muted-foreground",
									children: statusLabel[c.status] ?? c.status
								})
							]
						}, c.id))
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-editorial text-[30px] font-bold tracking-[-.03em] text-primary",
								children: [
									active.species,
									" · ",
									active.tracking_code
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[15px] leading-relaxed text-foreground",
								children: active.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-1 text-[14px] text-muted-foreground",
								children: [
									active.reporter_name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Reported by ", active.reporter_name] }),
									active.reporter_phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `tel:${active.reporter_phone}`,
											className: "underline",
											children: active.reporter_phone
										})]
									}),
									active.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: active.address }),
									active.latitude != null && active.longitude != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "inline-flex items-center gap-2 text-primary underline",
										href: `https://www.google.com/maps?q=${active.latitude},${active.longitude}`,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), "Open location on map"]
									})
								]
							})
						] }),
						photoQuery.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photoQuery.data,
							alt: "Reported animal",
							className: "max-h-80 w-full rounded-2xl border border-border object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "UPDATE STATUS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: setStatus.isPending || active.status === s,
								onClick: () => setStatus.mutate(s),
								className: active.status === s ? buttonClass : ghostButtonClass,
								children: statusLabel[s]
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ADD A CLINICAL NOTE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (e) => setNote(e.target.value),
								rows: 3,
								className: inputClass
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: addNote.isPending || note.trim().length < 3,
								onClick: () => addNote.mutate(),
								className: `${buttonClass} mt-3`,
								children: [addNote.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "SAVE NOTE"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-3",
								children: notes.data?.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-2xl border border-border bg-background p-4 text-[14px] text-foreground",
									children: n.note
								}, n.id))
							})
						] }),
						active.ai_assessment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border pt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentView, { data: active.ai_assessment })
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[15px] text-muted-foreground",
					children: "Select a case to see the full report."
				}) }) })]
			})
		]
	});
}
//#endregion
export { CasesPage as component };
