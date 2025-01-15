import { SignUpSchema } from '$lib/formSchemas';
import type { z } from 'zod';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ fetch, request }) => {
	let body: z.infer<typeof SignUpSchema>;
	try {
		body = SignUpSchema.parse(await request.json());
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}

	const uri = new URL('/auth/signup', PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(uri, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	const data = await response.json();
	if (response.status !== 200) {
		return json(data, { status: response.status });
	}

	return json(data, { status: 200 });
};
