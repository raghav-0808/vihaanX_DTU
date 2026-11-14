import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, i as useQueryClient, n as useQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { f as MapPin, g as Camera, m as LoaderCircle, o as Siren } from "../_libs/lucide-react.mjs";
import { a as buttonClass, i as Shell, n as Label, r as PageHead, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
import { n as fileToCompressedDataUrl } from "./media-Dvy0EOSy.mjs";
import { i as signCasePhoto, o as submitOwnerReport, t as AssessmentView } from "./reports.functions-kOaDYgr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests-DNzaZAIm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SPECIES = [
	"Cow",
	"Buffalo",
	"Goat",
	"Sheep",
	"Dog",
	"Cat",
	"Bird",
	"Horse",
	"Other"
];
var statusLabel = {
	new: "WAITING FOR A VET",
	accepted: "VET ACCEPTED",
	in_progress: "BEING TREATED",
	resolved: "RESOLVED",
	closed: "CLOSED"
};
function RequestsPage() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [species, setSpecies] = (0, import_react.useState)("Cow");
	const [description, setDescription] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [coords, setCoords] = (0, import_react.useState)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [openCase, setOpenCase] = (0, import_react.useState)(null);
	const cases = useQuery({
		queryKey: ["my-cases"],
		queryFn: async () => {
			const { data, error } = await supabase.from("cases").select("id, tracking_code, species, description, status, urgency, ai_assessment, photo_url, address, created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const notes = useQuery({
		queryKey: ["case-notes", openCase],
		enabled: !!openCase,
		queryFn: async () => {
			const { data, error } = await supabase.from("case_notes").select("id, note, created_at").eq("case_id", openCase).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const photoQuery = useQuery({
		queryKey: ["case-photo", openCase],
		enabled: !!openCase,
		queryFn: async () => {
			const path = cases.data?.find((c) => c.id === openCase)?.photo_url;
			if (!path) return null;
			return (await signCasePhoto({ data: { path } })).url;
		}
	});
	const create = useMutation({
		mutationFn: async () => {
			if (description.trim().length < 10) throw new Error("Please describe what is wrong in more detail.");
			return submitOwnerReport({ data: {
				species,
				description: description.trim(),
				address: address.trim() || null,
				latitude: coords?.lat ?? null,
				longitude: coords?.lng ?? null,
				imageDataUrl: photo
			} });
		},
		onSuccess: () => {
			setOpen(false);
			setDescription("");
			setPhoto(null);
			setError(null);
			queryClient.invalidateQueries({ queryKey: ["my-cases"] });
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not send that request.")
	});
	function useMyLocation() {
		navigator.geolocation?.getCurrentPosition((pos) => setCoords({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		}), () => setError("Location permission was refused. Please type the place instead."));
	}
	const active = cases.data?.find((c) => c.id === openCase) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				eyebrow: "EMERGENCY ASSISTANCE",
				title: "My requests",
				lead: "Raise a request and a veterinarian on JeevRakshak sees it with your photo, location and the AI assessment."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen((v) => !v),
				className: buttonClass,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Siren, { className: "h-4 w-4" }), open ? "CLOSE" : "REQUEST HELP NOW"]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ANIMAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: SPECIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSpecies(s),
							className: `rounded-xl border px-4 py-2 text-[14px] ${species === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-accent"}`,
							children: s
						}, s))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WHAT IS WRONG?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						rows: 5,
						className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PHOTO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-[14px] text-muted-foreground hover:bg-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }),
							photo ? "Photo added" : "Take or choose a photo",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								capture: "environment",
								className: "hidden",
								onChange: async (e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									try {
										setPhoto(await fileToCompressedDataUrl(file));
										setError(null);
									} catch (cause) {
										setError(cause instanceof Error ? cause.message : "Could not read that photo.");
									}
									e.target.value = "";
								}
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WHERE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: address,
							onChange: (e) => setAddress(e.target.value),
							className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
							placeholder: "Village, landmark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: useMyLocation,
							className: `inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 font-mono text-[10px] font-bold tracking-[.14em] text-primary transition hover:bg-accent disabled:opacity-50 mt-3`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), coords ? "LOCATION ADDED" : "USE MY LOCATION"]
						})
					] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => create.mutate(),
						disabled: create.isPending,
						className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-[11px] font-bold tracking-[.14em] text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
						children: [create.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), create.isPending ? "SENDING & ASSESSING…" : "SEND REQUEST"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						cases.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Loading your requests…"
						}),
						cases.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] text-muted-foreground",
							children: "You have not raised any requests yet."
						}),
						cases.data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpenCase(c.id),
							className: `w-full rounded-3xl border bg-card p-5 text-left transition ${openCase === c.id ? "border-primary" : "border-border hover:border-primary"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] font-bold tracking-[.16em] text-gold",
										children: statusLabel[c.status] ?? c.status
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
								})
							]
						}, c.id))
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] font-bold tracking-[.16em] text-gold",
						children: statusLabel[active.status] ?? active.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 font-editorial text-[28px] font-bold tracking-[-.03em] text-primary",
						children: [
							active.species,
							" · ",
							active.tracking_code
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[15px] text-foreground",
						children: active.description
					}),
					active.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[14px] text-muted-foreground",
						children: active.address
					}),
					photoQuery.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photoQuery.data,
						alt: "Reported animal",
						className: "mt-5 max-h-72 w-full rounded-2xl border border-border object-cover"
					}),
					notes.data && notes.data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-editorial text-[22px] font-bold tracking-[-.03em] text-primary",
							children: "Vet notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3",
							children: notes.data.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-2xl border border-border bg-background p-4 text-[14px] text-foreground",
								children: n.note
							}, n.id))
						})]
					}),
					active.ai_assessment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 border-t border-border pt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentView, { data: active.ai_assessment })
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[15px] text-muted-foreground",
					children: "Select a request to see its assessment and vet notes."
				}) }) })]
			})
		]
	});
}
//#endregion
export { RequestsPage as component };
