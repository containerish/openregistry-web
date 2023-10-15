import type { Interceptor } from "@connectrpc/connect";
import type { Cookies } from "@sveltejs/kit";

export const setCookies = (cookies: Cookies): Interceptor => {
	return (next) => async (req) => {
		const cookiesAsString = cookies
			.getAll()
			.map((cookie) => cookies.serialize(cookie.name, cookie.value))
			.join("; ");
		const accessToken = cookies.get("access_token");
		if (accessToken) {
			req.header.set("Authorization", `Bearer ${accessToken}`);
		}
		req.header.set("cookie", cookiesAsString);
		return await next(req);
	};
};
