import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CGpiNHzQ.js
var $$splitComponentImporter = () => import("./auth-T5Xlx76C.mjs");
var Route = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — JeevRakshak" },
		{
			name: "description",
			content: "Sign in or create a JeevRakshak account as a farmer, pet owner or veterinarian to manage animal health records and cases."
		},
		{
			property: "og:title",
			content: "Sign in — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Create a JeevRakshak account as an owner or veterinarian."
		}
	] }),
	validateSearch: (search) => ({ role: search["role"] === "vet" ? "vet" : "owner" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
