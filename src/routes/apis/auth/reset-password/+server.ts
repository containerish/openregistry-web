import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ResetPasswordType } from '$lib/types/user';
import { env } from '$env/dynamic/public';
import { ResetPasswordSchema } from '$lib/formSchemas';

export const POST: RequestHandler = async ({ fetch, cookies, request }) => {
	let body: ResetPasswordType;
	try {
		body = ResetPasswordSchema.parse(await request.json());
		const url = new URL('/auth/reset-password', env.PUBLIC_OPEN_REGISTRY_BACKEND_URL);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				cookie: `session_id=${cookies.get('session_id')}`,
				Authorization: 'Bearer ' + cookies.get('access_token')
			},
			body: JSON.stringify({
				old_password: body.currentPassword,
				new_password: body.newPassword
			})
		});
		const data = await response.json();
		if (response.status !== 202) {
			return json(data, { status: 400 });
		}
		return json(data, { status: response.status });
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}
};
