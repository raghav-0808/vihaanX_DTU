import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, i as useQueryClient, n as useQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { d as PawPrint, g as Camera, l as Plus, m as LoaderCircle } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as buttonClass, i as Shell, n as Label, o as ghostButtonClass, r as PageHead, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
import { n as fileToCompressedDataUrl, t as dataUrlToBlob } from "./media-Dvy0EOSy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/animals-CCZB6oTd.js
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
function AnimalsPage() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		species: "Cow",
		breed: "",
		sex: "",
		age: "",
		notes: ""
	});
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const animals = useQuery({
		queryKey: ["animals"],
		queryFn: async () => {
			const { data, error } = await supabase.from("animals").select("id, name, species, breed, age_years, photo_url").order("created_at", { ascending: false });
			if (error) throw error;
			return await Promise.all((data ?? []).map(async (a) => {
				if (!a.photo_url) return {
					...a,
					url: null
				};
				const { data: signed } = await supabase.storage.from("animal-photos").createSignedUrl(a.photo_url, 3600);
				return {
					...a,
					url: signed?.signedUrl ?? null
				};
			}));
		}
	});
	const create = useMutation({
		mutationFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			const uid = userData.user?.id;
			if (!uid) throw new Error("You are not signed in.");
			let path = null;
			if (photo) {
				path = `${uid}/animals/${crypto.randomUUID()}.jpg`;
				const { error: upErr } = await supabase.storage.from("animal-photos").upload(path, dataUrlToBlob(photo), { contentType: "image/jpeg" });
				if (upErr) throw new Error(`Photo upload failed: ${upErr.message}`);
			}
			const { error } = await supabase.from("animals").insert({
				owner_id: uid,
				name: form.name.trim(),
				species: form.species,
				breed: form.breed.trim() || null,
				sex: form.sex.trim() || null,
				age_years: form.age ? Number(form.age) : null,
				notes: form.notes.trim() || null,
				photo_url: path
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setOpen(false);
			setForm({
				name: "",
				species: "Cow",
				breed: "",
				sex: "",
				age: "",
				notes: ""
			});
			setPhoto(null);
			setError(null);
			queryClient.invalidateQueries({ queryKey: ["animals"] });
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not save this animal.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				eyebrow: "OWNER WORKSPACE",
				title: "My animals",
				lead: "Add each animal once. Vaccinations, treatments and past reports then stay attached to it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen((v) => !v),
				className: buttonClass,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), open ? "CLOSE" : "ADD AN ANIMAL"]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "NAME" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
								placeholder: "Lakshmi"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ANIMAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.species,
								onChange: (e) => setForm({
									...form,
									species: e.target.value
								}),
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
								children: SPECIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "BREED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.breed,
								onChange: (e) => setForm({
									...form,
									breed: e.target.value
								}),
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SEX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.sex,
								onChange: (e) => setForm({
									...form,
									sex: e.target.value
								}),
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
								placeholder: "Female"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "AGE (YEARS)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.age,
								onChange: (e) => setForm({
									...form,
									age: e.target.value
								}),
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
								inputMode: "decimal"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PHOTO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-[14px] text-muted-foreground hover:bg-accent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }),
									photo ? "Photo added" : "Choose a photo",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "NOTES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.notes,
									onChange: (e) => setForm({
										...form,
										notes: e.target.value
									}),
									rows: 3,
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
								})]
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: create.isPending || !form.name.trim(),
						onClick: () => create.mutate(),
						className: `inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-[11px] font-bold tracking-[.14em] text-primary-foreground transition hover:opacity-90 disabled:opacity-50 mt-6`,
						children: [create.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "SAVE ANIMAL"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					animals.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Loading your animals…"
					}),
					animals.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] text-muted-foreground",
						children: "No animals yet. Add your first one above."
					}),
					animals.data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/animals/$animalId",
						params: { animalId: a.id },
						className: "rounded-3xl border border-border bg-card p-5 transition hover:border-primary",
						children: [
							a.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: a.url,
								alt: a.name,
								className: "mb-4 h-40 w-full rounded-2xl object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 flex h-40 w-full items-center justify-center rounded-2xl bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "h-8 w-8 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-editorial text-[24px] font-bold tracking-[-.03em] text-primary",
								children: a.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[14px] text-muted-foreground",
								children: [
									a.species,
									a.breed,
									a.age_years ? `${a.age_years} yrs` : null
								].filter(Boolean).join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `${ghostButtonClass} mt-4`,
								children: "OPEN RECORDS"
							})
						]
					}, a.id))
				]
			})
		]
	});
}
//#endregion
export { AnimalsPage as component };
