import { t as supabase } from "./client-C8OKaGkH.mjs";
import { n as useQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, r as PageHead, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { t as OWNER_NAV } from "./nav-BjJUczmA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/records-BOqlyXMm.js
var import_jsx_runtime = require_jsx_runtime();
function RecordsPage() {
	const { data, isPending, error } = useQuery({
		queryKey: ["all-records"],
		queryFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			const user = userData.user;
			if (!user) throw new Error("No signed-in user");
			const [{ data: animals }, { data: vaccinations }, { data: records }] = await Promise.all([
				supabase.from("animals").select("id, name, species").eq("owner_id", user.id).order("name"),
				supabase.from("vaccinations").select("id, animal_id, vaccine, given_on, next_due_on, notes").eq("owner_id", user.id).order("given_on", { ascending: false }),
				supabase.from("medical_records").select("id, animal_id, record_date, title, diagnosis, treatment, vet_name").eq("owner_id", user.id).order("record_date", { ascending: false })
			]);
			return {
				animals: animals ?? [],
				vaccinations: vaccinations ?? [],
				records: records ?? []
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		nav: OWNER_NAV,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				eyebrow: "RECORD BOOK",
				title: "Every vaccination and treatment.",
				lead: "A single history for all of your animals, kept safely in your account."
			}),
			isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading records…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
				children: "We couldn't load your records. Please refresh and try again."
			}),
			data && (data.animals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[15px] leading-relaxed text-muted-foreground",
				children: [
					"You have not added any animals yet. Start on the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/animals",
						className: "text-primary underline",
						children: "animals page"
					}),
					"."
				]
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: data.animals.map((animal) => {
					const vaccines = data.vaccinations.filter((v) => v.animal_id === animal.id);
					const treatments = data.records.filter((r) => r.animal_id === animal.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-editorial text-[24px] font-bold tracking-[-.03em] text-primary",
							children: animal.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] font-bold tracking-[.14em] text-muted-foreground",
							children: animal.species.toUpperCase()
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/animals/$animalId",
							params: { animalId: animal.id },
							className: "font-mono text-[10px] font-bold tracking-[.14em] text-gold",
							children: "OPEN →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-[10px] font-bold tracking-[.16em] text-muted-foreground",
							children: "VACCINATIONS"
						}), vaccines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[14px] text-muted-foreground",
							children: "None recorded."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: vaccines.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-[14px] text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary",
									children: v.vaccine
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										" ",
										"· given ",
										v.given_on,
										v.next_due_on ? ` · next due ${v.next_due_on}` : ""
									]
								})]
							}, v.id))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-[10px] font-bold tracking-[.16em] text-muted-foreground",
							children: "TREATMENTS"
						}), treatments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[14px] text-muted-foreground",
							children: "None recorded."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: treatments.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-[14px] text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-primary",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											" ",
											"· ",
											r.record_date,
											r.vet_name ? ` · ${r.vet_name}` : ""
										]
									}),
									r.treatment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] leading-relaxed text-muted-foreground",
										children: r.treatment
									})
								]
							}, r.id))
						})] })]
					})] }, animal.id);
				})
			}))
		]
	});
}
//#endregion
export { RecordsPage as component };
