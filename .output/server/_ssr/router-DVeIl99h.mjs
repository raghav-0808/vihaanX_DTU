import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C8OKaGkH.mjs";
import { a as require_react, o as require_jsx_runtime, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { A as redirect, _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$12 } from "./animals._animalId-D0gfeIuR.mjs";
import { t as Route$13 } from "./auth-CGpiNHzQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DVeIl99h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-COPYO3UX.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "JeevRakshak — Animal health response" },
			{
				name: "description",
				content: "AI-assisted animal and livestock health response, from first report to complete care."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$10 = () => import("./routes-DuLIfVvw.mjs");
var Route$10 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "JeevRakshak — An animal needs help? Start here." },
		{
			name: "description",
			content: "Report an injured animal, manage your livestock health records, or respond as a veterinarian. AI-assisted preliminary assessment with coordinated care."
		},
		{
			property: "og:title",
			content: "JeevRakshak — An animal needs help? Start here."
		},
		{
			property: "og:description",
			content: "Report an injured animal, manage livestock health records, or respond to cases as a veterinarian."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./route-Di7iQBCH.mjs");
var Route$9 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { role: "owner" }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./report-YUABkgxR.mjs");
var Route$8 = createFileRoute("/report")({
	head: () => ({ meta: [
		{ title: "Report an injured animal — JeevRakshak" },
		{
			name: "description",
			content: "Report an injured or sick animal with a photo, description and location. No account needed — you get an instant AI assessment and a tracking code."
		},
		{
			property: "og:title",
			content: "Report an injured animal — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Send a photo and location; a veterinarian sees the case and you get a tracking code."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./animals-CCZB6oTd.mjs");
var Route$7 = createFileRoute("/_authenticated/animals")({
	head: () => ({ meta: [
		{ title: "My animals — JeevRakshak" },
		{
			name: "description",
			content: "Every animal you care for, with photos, breed, age and health notes."
		},
		{
			property: "og:title",
			content: "My animals — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Your animals and their health records in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./assistant-CJQqdElB.mjs");
var Route$6 = createFileRoute("/_authenticated/assistant")({
	head: () => ({ meta: [
		{ title: "AI health assistant — JeevRakshak" },
		{
			name: "description",
			content: "Describe symptoms and share a photo to get a preliminary veterinary assessment for your animal."
		},
		{
			property: "og:title",
			content: "AI health assistant — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Preliminary AI triage for your animal, from a photo and symptoms."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
async function requireVetRole() {
	const { data: { user }, error: userError } = await supabase.auth.getUser();
	if (userError || !user) throw redirect({
		to: "/auth",
		search: { role: "vet" }
	});
	const { data: role, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "vet").maybeSingle();
	if (error) throw new Error("We could not verify veterinarian access. Please try again.");
	if (!role) throw redirect({ to: "/dashboard" });
}
var $$splitComponentImporter$5 = () => import("./cases-B_CLhzu2.mjs");
var Route$5 = createFileRoute("/_authenticated/cases")({
	beforeLoad: requireVetRole,
	head: () => ({ meta: [
		{ title: "Case queue — JeevRakshak" },
		{
			name: "description",
			content: "Incoming animal emergency reports for veterinarians to accept and treat."
		},
		{
			property: "og:title",
			content: "Case queue — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Incoming animal emergency reports for veterinarians."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-DMdMNQ14.mjs");
var Route$4 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — JeevRakshak" },
		{
			name: "description",
			content: "Your JeevRakshak workspace for animal health records and cases."
		},
		{
			property: "og:title",
			content: "Dashboard — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Your JeevRakshak workspace."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./portal-BsbqeSzG.mjs");
var Route$3 = createFileRoute("/_authenticated/portal")({
	head: () => ({ meta: [
		{ title: "Farmer Portal — JeevRakshak" },
		{
			name: "description",
			content: "Your farmer and pet owner portal: animals, vaccinations due, active emergency requests and care updates in one view."
		},
		{
			property: "og:title",
			content: "Farmer Portal — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Animals, vaccinations due and active requests at a glance."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./records-BOqlyXMm.mjs");
var Route$2 = createFileRoute("/_authenticated/records")({
	head: () => ({ meta: [
		{ title: "Health Records — JeevRakshak" },
		{
			name: "description",
			content: "One health record book for all your animals: every vaccination given, next due dates and past treatments."
		},
		{
			property: "og:title",
			content: "Health Records — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Vaccinations and treatments across all of your animals."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./requests-DNzaZAIm.mjs");
var Route$1 = createFileRoute("/_authenticated/requests")({
	head: () => ({ meta: [
		{ title: "My requests — JeevRakshak" },
		{
			name: "description",
			content: "Emergency help requests you have raised and their current status."
		},
		{
			property: "og:title",
			content: "My requests — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Track the veterinary help requests you have raised."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./vet-portal-BolKltAL.mjs");
var Route = createFileRoute("/_authenticated/vet-portal")({
	beforeLoad: requireVetRole,
	head: () => ({ meta: [
		{ title: "Doctor Portal — JeevRakshak" },
		{
			name: "description",
			content: "Veterinarian portal: incoming animal cases, high priority reports, cases assigned to you and resolved outcomes."
		},
		{
			property: "og:title",
			content: "Doctor Portal — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Incoming cases, priorities and your caseload at a glance."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AuthenticatedRouteRoute = Route$9.update({
	id: "/_authenticated",
	getParentRoute: () => Route$11
});
var AuthRoute = Route$13.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$11
});
var ReportRoute = Route$8.update({
	id: "/report",
	path: "/report",
	getParentRoute: () => Route$11
});
var AuthenticatedAnimalsRoute = Route$7.update({
	id: "/animals",
	path: "/animals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAssistantRoute = Route$6.update({
	id: "/assistant",
	path: "/assistant",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCasesRoute = Route$5.update({
	id: "/cases",
	path: "/cases",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPortalRoute = Route$3.update({
	id: "/portal",
	path: "/portal",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRecordsRoute = Route$2.update({
	id: "/records",
	path: "/records",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRequestsRoute = Route$1.update({
	id: "/requests",
	path: "/requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVetPortalRoute = Route.update({
	id: "/vet-portal",
	path: "/vet-portal",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAnimalsRouteChildren = { AuthenticatedAnimalsAnimalIdRoute: Route$12.update({
	id: "/$animalId",
	path: "/$animalId",
	getParentRoute: () => AuthenticatedAnimalsRoute
}) };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAnimalsRoute: AuthenticatedAnimalsRoute._addFileChildren(AuthenticatedAnimalsRouteChildren),
	AuthenticatedAssistantRoute,
	AuthenticatedCasesRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedPortalRoute,
	AuthenticatedRecordsRoute,
	AuthenticatedRequestsRoute,
	AuthenticatedVetPortalRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ReportRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
