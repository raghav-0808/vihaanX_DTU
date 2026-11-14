import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Search, f as MapPin, g as Camera, m as LoaderCircle, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Brand-4dpmDfhd.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as buttonClass, n as Label, o as ghostButtonClass, s as inputClass, t as Card } from "./Shell-D6OrdCnJ.mjs";
import { n as fileToCompressedDataUrl } from "./media-Dvy0EOSy.mjs";
import { a as submitGuestReport, r as getCaseByCode, t as AssessmentView } from "./reports.functions-kOaDYgr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-YUABkgxR.js
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
function ReportPage() {
	const [species, setSpecies] = (0, import_react.useState)("Dog");
	const [description, setDescription] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [coords, setCoords] = (0, import_react.useState)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [lookupCode, setLookupCode] = (0, import_react.useState)("");
	const [lookup, setLookup] = (0, import_react.useState)(null);
	const [lookupMsg, setLookupMsg] = (0, import_react.useState)(null);
	async function onPhoto(file) {
		if (!file) return;
		setError(null);
		try {
			setPhoto(await fileToCompressedDataUrl(file));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not read that photo.");
		}
	}
	function useMyLocation() {
		if (!navigator.geolocation) {
			setError("Your device did not share a location. Please type the place instead.");
			return;
		}
		navigator.geolocation.getCurrentPosition((pos) => setCoords({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		}), () => setError("Location permission was refused. Please type the place instead."), {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	}
	async function submit(e) {
		e.preventDefault();
		setError(null);
		if (description.trim().length < 10) {
			setError("Please describe what is wrong in a little more detail.");
			return;
		}
		setBusy(true);
		try {
			const res = await submitGuestReport({ data: {
				species,
				description: description.trim(),
				reporterName: name.trim() || null,
				reporterPhone: phone.trim() || null,
				address: address.trim() || null,
				latitude: coords?.lat ?? null,
				longitude: coords?.lng ?? null,
				imageDataUrl: photo
			} });
			setResult(res);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	async function runLookup(e) {
		e.preventDefault();
		setLookupMsg(null);
		setLookup(null);
		try {
			const res = await getCaseByCode({ data: { code: lookupCode } });
			if (!res) setLookupMsg("No report found with that code.");
			else setLookup(res);
		} catch {
			setLookupMsg("Could not look that up right now.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-5 py-5 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[.14em] text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "BACK"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "paper-grid min-h-[calc(100vh-84px)] border-t border-border px-5 py-10 sm:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl space-y-8",
				children: [result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] font-bold tracking-[.18em] text-gold",
						children: "REPORT RECEIVED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-editorial text-4xl font-bold tracking-[-.035em] text-primary",
						children: ["Your tracking code is ", result.trackingCode]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
						children: "Save this code. A veterinarian on JeevRakshak can now see this case, and you can check its status below at any time."
					}),
					result.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: result.photoUrl,
						alt: "The animal you reported",
						className: "mt-6 max-h-80 w-full rounded-2xl border border-border object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 border-t border-border pt-8",
						children: result.assessment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentView, { data: result.assessment }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] text-muted-foreground",
							children: result.assessmentError ?? "The AI assessment is not available for this report."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setResult(null);
							setDescription("");
							setPhoto(null);
						},
						className: `${ghostButtonClass} mt-8`,
						children: "REPORT ANOTHER ANIMAL"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] font-bold tracking-[.18em] text-gold",
						children: "PUBLIC EMERGENCY REPORT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-editorial text-4xl font-bold leading-tight tracking-[-.035em] text-primary",
						children: "Help an animal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
						children: "No account needed. Add a photo and tell us what you see — you will get an instant preliminary assessment and the case reaches a veterinarian."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ANIMAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: SPECIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSpecies(s),
									className: `rounded-xl border px-4 py-2 text-[14px] transition ${species === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-accent"}`,
									children: s
								}, s))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WHAT IS WRONG?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 5,
								placeholder: "Where it is hurt, how it is behaving, how long it has been like this…",
								className: inputClass
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PHOTO (STRONGLY RECOMMENDED)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-4 text-[14px] text-muted-foreground hover:bg-accent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }),
										photo ? "Photo added — tap to change" : "Take or choose a photo",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											capture: "environment",
											className: "hidden",
											onChange: (e) => onPhoto(e.target.files?.[0])
										})
									]
								}),
								photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "Selected animal",
									className: "mt-3 max-h-64 rounded-2xl border border-border object-cover"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "YOUR NAME (OPTIONAL)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (e) => setName(e.target.value),
									className: inputClass
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PHONE (OPTIONAL)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: inputClass
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "WHERE IS THE ANIMAL?" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: address,
									onChange: (e) => setAddress(e.target.value),
									placeholder: "Village, landmark or street",
									className: inputClass
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: useMyLocation,
									className: `${ghostButtonClass} mt-3`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), coords ? "LOCATION ADDED" : "USE MY LOCATION"]
								}),
								coords && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-mono text-[11px] text-muted-foreground",
									children: [
										coords.lat.toFixed(5),
										", ",
										coords.lng.toFixed(5)
									]
								})
							] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-destructive",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: busy,
								className: buttonClass,
								children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), busy ? "SENDING & ASSESSING…" : "SEND REPORT"]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-editorial text-[24px] font-bold tracking-[-.03em] text-primary",
						children: "Check a report you already sent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: runLookup,
						className: "mt-4 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: lookupCode,
							onChange: (e) => setLookupCode(e.target.value),
							placeholder: "JR-XXXXXX",
							className: `${inputClass} max-w-xs`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: buttonClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), "CHECK STATUS"]
						})]
					}),
					lookupMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[14px] text-muted-foreground",
						children: lookupMsg
					}),
					lookup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4 border-t border-border pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-accent px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[.16em] text-primary uppercase",
									children: ["STATUS: ", String(lookup.status).replace("_", " ")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: lookup.tracking_code
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[15px] text-foreground",
								children: [
									lookup.species,
									" — ",
									lookup.description
								]
							}),
							lookup.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: lookup.photoUrl,
								alt: "Reported animal",
								className: "max-h-64 rounded-2xl border border-border object-cover"
							}),
							lookup.ai_assessment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentView, { data: lookup.ai_assessment })
							})
						]
					})
				] })]
			})
		})]
	});
}
//#endregion
export { ReportPage as component };
