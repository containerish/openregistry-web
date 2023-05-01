import { SignUpSchema } from '$lib/formSchemas';
import type { SignupRequestType } from '$lib/types/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const POST: RequestHandler = async ({ fetch, request }) => {
	let body: SignupRequestType;
	try {
		body = SignUpSchema.parse(await request.json());
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}
	const { confirmPassword: _, ...rest } = body;
	const url = new URL('/auth/signup', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(url, {
		body: JSON.stringify(rest),
		method: 'POST'
	});

	if (response.status !== 201) {
		return json(await response.json(), { status: response.status });
	}
	return json(await response.json(), { status: 201 });
};
