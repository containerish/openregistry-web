import { z } from 'zod';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { get, parseRequestOptionsFromJSON } from '@github/webauthn-json/browser-ponyfill';
import type { CredentialRequestOptionsJSON } from '@github/webauthn-json/browser-ponyfill';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

const WebAuthNBeginLoginRequestSchema = z.object({
	username: z.string(),
});

export const POST: RequestHandler = async ({ fetch, request }) => {
	let body: z.infer<typeof WebAuthNBeginLoginRequestSchema>;
	try {
		body = WebAuthNBeginLoginRequestSchema.parse(await request.json());
	} catch (err) {
		return json({ error: err }, { status: 400 });
	}

	const beginLoginUrl = new URL(`/webauthn/login/begin?username=${body.username}`, PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	const response = await fetch(beginLoginUrl);
	if (response.status !== 200) {
		return json({ error: await response.json() }, { status: response.status });
	}

	const data = await response.json();
	const options = (data as { options: CredentialRequestOptionsJSON }).options;
	const requestOptions = parseRequestOptionsFromJSON(options);
	const credential = await get(requestOptions);
	const finishLoginPath = new URL(
		`/webauthn/login/finish?username=${body.username}`,
		PUBLIC_OPEN_REGISTRY_BACKEND_URL
	);

	const finishResponse = await fetch(finishLoginPath, {
		method: 'POST',
		body: JSON.stringify(credential),
	});

	const finishResponseData = finishResponse.json();

	if (finishResponse.status !== 200) {
		return json({ error: finishResponseData }, { status: finishResponse.status });
	}

	return json(finishResponseData, { status: 200 });
};
