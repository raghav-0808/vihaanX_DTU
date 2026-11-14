import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, i as useQueryClient, n as useQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { d as PawPrint, i as Stethoscope, l as Plus, m as LoaderCircle, r as Syringe, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as buttonClass, i as Shell, n as Label, r as PageHead, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
import { t as Route } from "./animals._animalId-D0gfeIuR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/animals._animalId-DAL97HO4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnimalDetail() {
	const { animalId } = Route.useParams();
	const queryClient = useQueryClient();
	const [vacOpen, setVacOpen] = (0, import_react.useState)(false);
	const [recOpen, setRecOpen] = (0, import_react.useState)(false);
	const [vac, setVac] = (0, import_react.useState)({
		vaccine: "",
		given_on: "",
		next_due_on: "",
		notes: ""
	});
	const [rec, setRec] = (0, import_react.useState)({
		record_date: "",
		title: "",
		diagnosis: "",
		treatment: "",
		vet_name: "",
		notes: ""
	});
	const [error, setError] = (0, import_react.useState)(null);
	const animal = useQuery({
		queryKey: ["animal", animalId],
		queryFn: async () => {
			const { data, error } = await supabase.from("animals").select("id, owner_id, name, species, breed, sex, age_years, notes, photo_url").eq("id", animalId).maybeSingle();
			if (error) throw error;
			if (!data) return null;
			let url = null;
			if (data.photo_url) {
				const { data: signed } = await supabase.storage.from("animal-photos").createSignedUrl(data.photo_url, 3600);
				url = signed?.signedUrl ?? null;
			}
			return {
				...data,
				url
			};
		}
	});
	const vaccinations = useQuery({
		queryKey: ["vaccinations", animalId],
		queryFn: async () => {
			const { data, error } = await supabase.from("vaccinations").select("id, vaccine, given_on, next_due_on, notes").eq("animal_id", animalId).order("given_on", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const records = useQuery({
		queryKey: ["records", animalId],
		queryFn: async () => {
			const { data, error } = await supabase.from("medical_records").select("id, record_date, title, diagnosis, treatment, vet_name, notes").eq("animal_id", animalId).order("record_date", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const addVac = useMutation({
		mutationFn: async () => {
			const owner = animal.data?.owner_id;
			if (!owner) throw new Error("Animal not loaded.");
			const { error } = await supabase.from("vaccinations").insert({
				animal_id: animalId,
				owner_id: owner,
				vaccine: vac.vaccine.trim(),
				given_on: vac.given_on,
				next_due_on: vac.next_due_on || null,
				notes: vac.notes.trim() || null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setVac({
				vaccine: "",
				given_on: "",
				next_due_on: "",
				notes: ""
			});
			setVacOpen(false);
			setError(null);
			queryClient.invalidateQueries({ queryKey: ["vaccinations", animalId] });
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not save that vaccination.")
	});
	const addRec = useMutation({
		mutationFn: async () => {
			const owner = animal.data?.owner_id;
			if (!owner) throw new Error("Animal not loaded.");
			const { error } = await supabase.from("medical_records").insert({
				animal_id: animalId,
				owner_id: owner,
				record_date: rec.record_date,
				title: rec.title.trim(),
				diagnosis: rec.diagnosis.trim() || null,
				treatment: rec.treatment.trim() || null,
				vet_name: rec.vet_name.trim() || null,
				notes: rec.notes.trim() || null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setRec({
				record_date: "",
				title: "",
				diagnosis: "",
				treatment: "",
				vet_name: "",
				notes: ""
			});
			setRecOpen(false);
			setError(null);
			queryClient.invalidateQueries({ queryKey: ["records", animalId] });
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not save that record.")
	});
	if (animal.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		nav: OWNER_NAV,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading…"
		})
	});
	if (!animal.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			eyebrow: "NOT FOUND",
			title: "That animal isn't here",
			lead: "It may have been removed."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/animals",
			className: buttonClass,
			children: "BACK TO MY ANIMALS"
		})]
	});
	const a = animal.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/animals",
			className: "mb-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[.14em] text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "ALL ANIMALS"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[320px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				a.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: a.url,
					alt: a.name,
					className: "mb-5 h-52 w-full rounded-2xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-5 flex h-52 w-full items-center justify-center rounded-2xl bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "h-9 w-9 text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-editorial text-4xl font-bold tracking-[-.035em] text-primary",
					children: a.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[14px] text-muted-foreground",
					children: [
						a.species,
						a.breed,
						a.sex,
						a.age_years ? `${a.age_years} yrs` : null
					].filter(Boolean).join(" · ")
				}),
				a.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[14px] leading-relaxed text-foreground",
					children: a.notes
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "inline-flex items-center gap-2 font-editorial text-[26px] font-bold tracking-[-.03em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Syringe, { className: "h-5 w-5" }), "Vaccinations"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setVacOpen((v) => !v),
								className: buttonClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), vacOpen ? "CLOSE" : "ADD"]
							})]
						}),
						vacOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "VACCINE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: vac.vaccine,
									onChange: (e) => setVac({
										...vac,
										vaccine: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
									placeholder: "FMD"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "GIVEN ON" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: vac.given_on,
									onChange: (e) => setVac({
										...vac,
										given_on: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "NEXT DUE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: vac.next_due_on,
									onChange: (e) => setVac({
										...vac,
										next_due_on: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "NOTES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: vac.notes,
									onChange: (e) => setVac({
										...vac,
										notes: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: addVac.isPending || !vac.vaccine.trim() || !vac.given_on,
										onClick: () => addVac.mutate(),
										className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-[11px] font-bold tracking-[.14em] text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
										children: [addVac.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "SAVE VACCINATION"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3",
							children: [vaccinations.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-[14px] text-muted-foreground",
								children: "No vaccinations recorded yet."
							}), vaccinations.data?.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl border border-border bg-background p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[15px] font-bold text-primary",
											children: v.vaccine
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: ["given ", v.given_on]
										})]
									}),
									v.next_due_on && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-[11px] tracking-[.1em] text-gold",
										children: ["NEXT DUE ", v.next_due_on]
									}),
									v.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[14px] text-muted-foreground",
										children: v.notes
									})
								]
							}, v.id))]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "inline-flex items-center gap-2 font-editorial text-[26px] font-bold tracking-[-.03em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-5 w-5" }), "Medical records"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRecOpen((v) => !v),
								className: buttonClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), recOpen ? "CLOSE" : "ADD"]
							})]
						}),
						recOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "DATE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: rec.record_date,
									onChange: (e) => setRec({
										...rec,
										record_date: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "TITLE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rec.title,
									onChange: (e) => setRec({
										...rec,
										title: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
									placeholder: "Fever and loss of appetite"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "DIAGNOSIS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rec.diagnosis,
									onChange: (e) => setRec({
										...rec,
										diagnosis: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "TREATMENT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rec.treatment,
									onChange: (e) => setRec({
										...rec,
										treatment: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "VETERINARIAN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rec.vet_name,
									onChange: (e) => setRec({
										...rec,
										vet_name: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "NOTES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rec.notes,
									onChange: (e) => setRec({
										...rec,
										notes: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: addRec.isPending || !rec.title.trim() || !rec.record_date,
										onClick: () => addRec.mutate(),
										className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-[11px] font-bold tracking-[.14em] text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
										children: [addRec.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "SAVE RECORD"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3",
							children: [records.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-[14px] text-muted-foreground",
								children: "No treatments recorded yet."
							}), records.data?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl border border-border bg-background p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[15px] font-bold text-primary",
											children: r.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: r.record_date
										})]
									}),
									r.diagnosis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1.5 text-[14px] text-foreground",
										children: ["Diagnosis: ", r.diagnosis]
									}),
									r.treatment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[14px] text-foreground",
										children: ["Treatment: ", r.treatment]
									}),
									r.vet_name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-[13px] text-muted-foreground",
										children: ["Seen by ", r.vet_name]
									}),
									r.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[14px] text-muted-foreground",
										children: r.notes
									})
								]
							}, r.id))]
						})
					] })
				]
			})]
		})]
	});
}
//#endregion
export { AnimalDetail as component };
