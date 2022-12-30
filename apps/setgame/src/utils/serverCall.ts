import { CONFIG } from "../config";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const serverCall = {
	call: async (path: string, method: Method, body: any = {}) => {
		const res = await fetch(CONFIG.http + path, {
			method,
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const data = await res.json();
		return data;
	},

	GET: async (path: string) => {
		return await serverCall.call(path, "GET");
	},

	POST: async (path: string, body: any = {}) => {
		return await serverCall.call(path, "POST", body);
	},

	PUT: async (path: string, body: any = {}) => {
		return await serverCall.call(path, "PUT", body);
	},

	DELETE: async (path: string, body: any = {}) => {
		return await serverCall.call(path, "DELETE", body);
	},

	WS: async (ws: WebSocket) => {
		ws.send("Hello");
	},
};
