import { SignInSchema } from '$lib/formSchemas';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ fetch, request, cookies, url }) => {
	const body = await (async () => {
		const data = await request.json();
		return SignInSchema.safeParse(data);
	})();

	if (!body.success) {
		return json({ error: body.error }, { status: 400 });
	}

	const uri = new URL('/auth/signin', PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(uri, {
		body: JSON.stringify(body.data),
		method: 'POST',
	});

	const data = (await response.json()) as Record<string, string>;
	if (response.status !== 200) {
		return json(data, { status: response.status });
	}

	const now = new Date();
	Object.entries(data).forEach(([key, value]) => {
		cookies.set(key, value, {
			path: '/',
			sameSite: 'lax',
			domain: url.hostname,
			// TODO: find a better way to do this
			httpOnly: false,
			secure: url.protocol === ':https',
			expires: (() => {
				const date = new Date();
				date.setHours(now.getHours() + 1); // valid for 1 hour
				return date;
			})(),
		});
	});

	return json(data, { status: 200 });
};
