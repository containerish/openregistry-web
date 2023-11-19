import { env } from "$env/dynamic/public";
import type { HandleClientError } from "@sveltejs/kit";
import posthog from "posthog-js";
import { dev, browser } from "$app/environment";

if (browser && env.PUBLIC_POSTHOG_API_KEY) {
	posthog.init(env.PUBLIC_POSTHOG_API_KEY, {
		api_host: env.PUBLIC_POSTHOG_API_HOST,
	});
}

export const handleError: HandleClientError = async ({ error, event }) => {
	console.log(
		"unhandled client exception - route: %s - error: %s",
		event.route.id,
		error
	);

	return {
		message: typeof error === "string" ? error : JSON.stringify(error),
	};
};
