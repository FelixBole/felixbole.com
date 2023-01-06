export const CONFIG = {
	http: "/api",
	wss: `ws${window.location.protocol === "https:" ? "s" : ""}://${window.location.host}/api`,
};
