//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-By6h9iJb.js
var manifest = {
	"18b0ebc8010abaaea5e61a920ecf427f13634925a9ad70027fdf21188f9b2ffd": {
		functionName: "getCaseByCode_createServerFn_handler",
		importer: () => import("./_ssr/reports.functions-CVcw7ByH.mjs")
	},
	"2f931709ce36321fe896cfd72e1788b67dd46f405b9770fa5ef12f802b43aecb": {
		functionName: "signCasePhoto_createServerFn_handler",
		importer: () => import("./_ssr/reports.functions-CVcw7ByH.mjs")
	},
	"74c5b1c77ffd794720b68f4b492abdce1a3efa717aac9e6453fbec8f5cf491a3": {
		functionName: "assessAnimalHealth_createServerFn_handler",
		importer: () => import("./_ssr/reports.functions-CVcw7ByH.mjs")
	},
	"8621b042da3fb1aca4031bd6b8f55d63e4bcbbb09e8f2f6bae283068f4e1d7d4": {
		functionName: "submitGuestReport_createServerFn_handler",
		importer: () => import("./_ssr/reports.functions-CVcw7ByH.mjs")
	},
	"89e6f2df1b81a464ca47076d7f661ce88b58b2dbdc3d577f75926d5c127f6e1a": {
		functionName: "submitOwnerReport_createServerFn_handler",
		importer: () => import("./_ssr/reports.functions-CVcw7ByH.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
