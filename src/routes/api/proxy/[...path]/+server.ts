import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_OPEN_REGISTRY_BACKEND_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request, fetch, url, cookies }) => {
	console.log('POST - path: ', url.pathname);

	// strip proxy out of the api path
	const apiPath = url.pathname.replace('/api/proxy/', '');
	const uri = new URL(apiPath, PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	console.log('backend uri: ', uri.toString());

	const resp = await fetch(uri, {
		method: 'POST',
		body: JSON.stringify(await request.json()),
		headers: {
			Authorization: 'Bearer ' + cookies.get('access_token'),
		},
	});

	if (resp.status === 204) {
		return new Response(null, { status: 204 });
	}

	try {
		const data = await resp.json();
		return json(data, { status: resp.status });
	} catch (err) {
		return json({ error: (err as Error).message }, { status: 500 });
	}
};

export const PATCH: RequestHandler = async ({ request, url, cookies }) => {
	console.log('PATCH - path: ', url.pathname);

	// strip proxy out of the api path
	const apiPath = url.pathname.replace('/api/proxy/', '');
	const uri = new URL(apiPath, PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	console.log('backend uri: ', uri.toString());

	const resp = await fetch(uri, {
		method: 'PATCH',
		body: JSON.stringify(await request.json()),
		headers: {
			Authorization: 'Bearer ' + cookies.get('access_token'),
		},
	});

	if (resp.status === 204) {
		return new Response(null, { status: 204 });
	}

	try {
		const data = await resp.json();
		return json(data, { status: resp.status });
	} catch (err) {
		return json({ error: (err as Error).message }, { status: 500 });
	}
};

export const GET: RequestHandler = async ({ url, cookies }) => {
	console.log('GET - path: ', url.pathname);

	// strip proxy out of the api path
	const apiPath = url.pathname.replace('/api/proxy/', '');
	const uri = new URL(apiPath, PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	console.log('backend uri: ', uri.toString());

	const resp = await fetch(uri, {
		headers: {
			Authorization: 'Bearer ' + cookies.get('access_token'),
		},
	});

	if (resp.status === 204) {
		return new Response(null, { status: 204 });
	}

	try {
		const data = await resp.json();
		return json(data, { status: resp.status });
	} catch (err) {
		return json({ error: (err as Error).message }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ url, cookies }) => {
	console.log('DELETE - path: ', url.pathname);

	// strip proxy out of the api path
	const apiPath = url.pathname.replace('/api/proxy/', '');
	const uri = new URL(apiPath, PUBLIC_OPEN_REGISTRY_BACKEND_URL);
	console.log('backend uri: ', uri.toString());

	const resp = await fetch(uri, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + cookies.get('access_token'),
		},
	});

	if (resp.status === 204) {
		return new Response(null, { status: 204 });
	}

	try {
		const data = await resp.json();
		return json(data, { status: resp.status });
	} catch (err) {
		return json({ error: (err as Error).message }, { status: 500 });
	}
};
