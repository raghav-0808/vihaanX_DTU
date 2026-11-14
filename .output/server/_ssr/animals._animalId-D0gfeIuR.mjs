import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/animals._animalId-D0gfeIuR.js
var $$splitComponentImporter = () => import("./animals._animalId-DAL97HO4.mjs");
var Route = createFileRoute("/_authenticated/animals/$animalId")({
	head: () => ({ meta: [
		{ title: "Animal records — JeevRakshak" },
		{
			name: "description",
			content: "Vaccinations and medical history for one animal."
		},
		{
			property: "og:title",
			content: "Animal records — JeevRakshak"
		},
		{
			property: "og:description",
			content: "Vaccinations and medical history for one animal."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
