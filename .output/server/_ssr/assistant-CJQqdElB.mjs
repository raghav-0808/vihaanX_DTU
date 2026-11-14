import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, n as useQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Sparkles, g as Camera, m as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as buttonClass, i as Shell, n as Label, r as PageHead, s as inputClass, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
import { n as fileToCompressedDataUrl } from "./media-Dvy0EOSy.mjs";
import { n as assessAnimalHealth, t as AssessmentView } from "./reports.functions-kOaDYgr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant-CJQqdElB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssistantPage() {
	const [animalId, setAnimalId] = (0, import_react.useState)("");
	const [species, setSpecies] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const animals = useQuery({
		queryKey: ["animals-brief"],
		queryFn: async () => {
			const { data, error } = await supabase.from("animals").select("id, name, species, breed, age_years, notes").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function run() {
		setError(null);
		if (description.trim().length < 10) {
			setError("Please describe the symptoms in a little more detail.");
			return;
		}
		setBusy(true);
		setResult(null);
		try {
			const chosen = animals.data?.find((a) => a.id === animalId);
			let extra = null;
			if (chosen) {
				const [{ data: vacs }, { data: recs }] = await Promise.all([supabase.from("vaccinations").select("vaccine, given_on, next_due_on").eq("animal_id", chosen.id).limit(10), supabase.from("medical_records").select("record_date, title, diagnosis, treatment").eq("animal_id", chosen.id).limit(10)]);
				extra = [
					`Animal: ${chosen.name}, ${chosen.species}${chosen.breed ? `, ${chosen.breed}` : ""}${chosen.age_years ? `, ${chosen.age_years} years old` : ""}`,
					chosen.notes ? `Owner notes: ${chosen.notes}` : "",
					vacs?.length ? `Vaccinations: ${vacs.map((v) => `${v.vaccine} on ${v.given_on}`).join("; ")}` : "No vaccinations recorded.",
					recs?.length ? `Past treatments: ${recs.map((r) => `${r.record_date} ${r.title} ${r.diagnosis ?? ""} ${r.treatment ?? ""}`).join("; ")}` : "No past treatments recorded."
				].filter(Boolean).join("\n");
			}
			const res = await assessAnimalHealth({ data: {
				species: chosen?.species ?? species ?? null,
				description: description.trim(),
				extraContext: extra,
				imageDataUrl: photo
			} });
			setResult(res);
		} catch (e) {
			setError(e instanceof Error ? e.message : "The assistant could not answer right now.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			eyebrow: "AI HEALTH ASSISTANT",
			title: "What is wrong with your animal?",
			lead: "Add a photo and describe what you are seeing. The assistant reads your animal's own records too."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WHICH ANIMAL?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: animalId,
						onChange: (e) => setAnimalId(e.target.value),
						className: inputClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Not one of my saved animals"
						}), animals.data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: a.id,
							children: [
								a.name,
								" — ",
								a.species
							]
						}, a.id))]
					})] }),
					!animalId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ANIMAL TYPE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: species,
						onChange: (e) => setSpecies(e.target.value),
						className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary",
						placeholder: "Cow, goat, dog…"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SYMPTOMS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						rows: 6,
						className: inputClass,
						placeholder: "Not eating since two days, swollen udder, limping on the left hind leg…"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PHOTO (OPTIONAL)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-[14px] text-muted-foreground hover:bg-accent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }),
								photo ? "Photo added — tap to change" : "Take or choose a photo",
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
						}),
						photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo,
							alt: "Selected animal",
							className: "mt-3 max-h-56 rounded-2xl border border-border object-cover"
						})
					] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: run,
						disabled: busy,
						className: buttonClass,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), busy ? "THINKING…" : "GET ASSESSMENT"]
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentView, { data: result }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] leading-relaxed text-muted-foreground",
				children: "The assessment appears here. The more you describe — how long, what changed, appetite, temperature, wounds — the more specific the answer."
			}) })]
		})]
	});
}
//#endregion
export { AssistantPage as component };
