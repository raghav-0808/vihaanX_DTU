globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-11-14T12:43:02.031Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/animals-BGd479qR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0e-BVk1tPu0IwUwEQiHZWbSx9qb4iQ\"",
		"mtime": "2026-11-14T13:28:27.187Z",
		"size": 6670,
		"path": "../public/assets/animals-BGd479qR.js"
	},
	"/assets/arrow-left-DOtqCLgl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-dbyVFObEWdB046lOkQ+Qts1MhTQ\"",
		"mtime": "2026-11-14T13:28:27.188Z",
		"size": 154,
		"path": "../public/assets/arrow-left-DOtqCLgl.js"
	},
	"/assets/animals._animalId-ocBwicWt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2dda-yToWxmpw70+sgTZ9XmHnpx1A0HQ\"",
		"mtime": "2026-11-14T13:28:27.187Z",
		"size": 11738,
		"path": "../public/assets/animals._animalId-ocBwicWt.js"
	},
	"/assets/assistant-D1nK8W8E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1375-M4SK0IVAA1yLNl+nqaXQyEH9CJo\"",
		"mtime": "2026-11-14T13:28:27.188Z",
		"size": 4981,
		"path": "../public/assets/assistant-D1nK8W8E.js"
	},
	"/assets/auth-C5YeBOSp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137c-EaCbOGahG/4R2fKvB8sZlkWvn2k\"",
		"mtime": "2026-11-14T13:28:27.189Z",
		"size": 4988,
		"path": "../public/assets/auth-C5YeBOSp.js"
	},
	"/assets/cases-DS9vE-ey.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a77-u2TOOnEAEwJrvVyBKa4QZ9XxG1Q\"",
		"mtime": "2026-11-14T13:28:27.189Z",
		"size": 6775,
		"path": "../public/assets/cases-DS9vE-ey.js"
	},
	"/assets/dashboard-DnxfHSqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ebf-4MTBqG0DZSAomMM/2NOwEXYuWTw\"",
		"mtime": "2026-11-14T13:28:27.191Z",
		"size": 3775,
		"path": "../public/assets/dashboard-DnxfHSqU.js"
	},
	"/assets/Brand-u94IL7u1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99b-zMFdlfeCJsIPlJdiy8Pmw/FcpnQ\"",
		"mtime": "2026-11-14T13:28:27.184Z",
		"size": 2459,
		"path": "../public/assets/Brand-u94IL7u1.js"
	},
	"/assets/loader-circle-DP-GZCQL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-/YlY4dEq0B8i72Oo3EdJyLea/AM\"",
		"mtime": "2026-11-14T13:28:27.192Z",
		"size": 133,
		"path": "../public/assets/loader-circle-DP-GZCQL.js"
	},
	"/assets/map-pin-BafE-jTR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-b6Khyqa1233mUJYJUAqXVZXtTtw\"",
		"mtime": "2026-11-14T13:28:27.192Z",
		"size": 248,
		"path": "../public/assets/map-pin-BafE-jTR.js"
	},
	"/assets/matchContext-c9yfmv24.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-PoyBQb1Ij5xbff92wmOOXj3ynuw\"",
		"mtime": "2026-11-14T13:28:27.193Z",
		"size": 159,
		"path": "../public/assets/matchContext-c9yfmv24.js"
	},
	"/assets/media-DFjKSYMy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"679-QdQ6lJGXKlvV1CjfFE45gWzdEis\"",
		"mtime": "2026-11-14T13:28:27.194Z",
		"size": 1657,
		"path": "../public/assets/media-DFjKSYMy.js"
	},
	"/assets/nav-D_q7z2Jm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"206f-/rJBiajYXproL3RRJqZvEtwmDgw\"",
		"mtime": "2026-11-14T13:28:27.194Z",
		"size": 8303,
		"path": "../public/assets/nav-D_q7z2Jm.js"
	},
	"/assets/client-erMY_7Ru.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b1b-ERiv532NnVYuwWFPuLAnktAUXOU\"",
		"mtime": "2026-11-14T13:28:27.190Z",
		"size": 228123,
		"path": "../public/assets/client-erMY_7Ru.js"
	},
	"/assets/index-LB-K8L1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56307-1XW638VoMjC7Gz4oTfjVb1i+nKI\"",
		"mtime": "2026-11-14T13:28:27.184Z",
		"size": 353031,
		"path": "../public/assets/index-LB-K8L1j.js"
	},
	"/assets/portal-FIF0bPMo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1489-iEVlmab+JIJBoyYGz4061xath9U\"",
		"mtime": "2026-11-14T13:28:27.196Z",
		"size": 5257,
		"path": "../public/assets/portal-FIF0bPMo.js"
	},
	"/assets/plus-BOUVOIBF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-eC/UDmNI9OdwJKSlEHDOwe3c82I\"",
		"mtime": "2026-11-14T13:28:27.195Z",
		"size": 142,
		"path": "../public/assets/plus-BOUVOIBF.js"
	},
	"/assets/records-CUHDQMIH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9f-/yWdwych0MIeUSnDSNLZvXEq/98\"",
		"mtime": "2026-11-14T13:28:27.197Z",
		"size": 3743,
		"path": "../public/assets/records-CUHDQMIH.js"
	},
	"/assets/qss-Bqk2G4CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-2N+JPG3965eWSB0QcbrDwgkqrgU\"",
		"mtime": "2026-11-14T13:28:27.197Z",
		"size": 444,
		"path": "../public/assets/qss-Bqk2G4CH.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-11-14T13:28:27.199Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/report-CwX6x3wk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fbf-gJYC8gsoR90HUAPBN55sneZTdUk\"",
		"mtime": "2026-11-14T13:28:27.200Z",
		"size": 8127,
		"path": "../public/assets/report-CwX6x3wk.js"
	},
	"/assets/requests-X3OkBDNd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f6b-enECAXIYXByrBt7+bonrCuRc0zM\"",
		"mtime": "2026-11-14T13:28:27.201Z",
		"size": 8043,
		"path": "../public/assets/requests-X3OkBDNd.js"
	},
	"/assets/reports.functions-D4Tgs3I2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe78-KYQWv5XVNJF8hyEPvHyUmdfzWqQ\"",
		"mtime": "2026-11-14T13:28:27.201Z",
		"size": 65144,
		"path": "../public/assets/reports.functions-D4Tgs3I2.js"
	},
	"/assets/route-Bye5u-Gn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-cOSdnbHEzySo79a6k/ITHZ562Qk\"",
		"mtime": "2026-11-14T13:28:27.202Z",
		"size": 138,
		"path": "../public/assets/route-Bye5u-Gn.js"
	},
	"/assets/routes-BrCYFGl8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b0-KdaOIqJa2aBVBeYyuywWrULnR4Q\"",
		"mtime": "2026-11-14T13:28:27.203Z",
		"size": 4272,
		"path": "../public/assets/routes-BrCYFGl8.js"
	},
	"/assets/Shell-DcFG3fU-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b51-iZ7SwcMOHseWUKOq0e36o3B1IhI\"",
		"mtime": "2026-11-14T13:28:27.185Z",
		"size": 2897,
		"path": "../public/assets/Shell-DcFG3fU-.js"
	},
	"/assets/stethoscope-eN78X2le.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14b-uIzSaVC9os5uV1OlktUIWC4qEQE\"",
		"mtime": "2026-11-14T13:28:27.204Z",
		"size": 331,
		"path": "../public/assets/stethoscope-eN78X2le.js"
	},
	"/assets/styles-COPYO3UX.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"12e9a-aSlcszfI2zIlKGxm+A+i6StgChw\"",
		"mtime": "2026-11-14T13:28:27.207Z",
		"size": 77466,
		"path": "../public/assets/styles-COPYO3UX.css"
	},
	"/assets/useMutation-C8oxC6Ln.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"914-ReICBABR+DPrfVAwwR3UeeMn3eI\"",
		"mtime": "2026-11-14T13:28:27.205Z",
		"size": 2324,
		"path": "../public/assets/useMutation-C8oxC6Ln.js"
	},
	"/assets/useStore-BLBd9nEN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d01-Dnvt5P1cFzRlpTYaJ7MkQpfpR+U\"",
		"mtime": "2026-11-14T13:28:27.206Z",
		"size": 27905,
		"path": "../public/assets/useStore-BLBd9nEN.js"
	},
	"/assets/vet-portal-DznBzsUE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee6-G9fxpfjSFpAHbTULArjogyqj7wU\"",
		"mtime": "2026-11-14T13:28:27.206Z",
		"size": 3814,
		"path": "../public/assets/vet-portal-DznBzsUE.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_3mKEpC = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_3mKEpC
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
