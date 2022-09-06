import { Auth } from '../apis/auth';
import type { LayoutServerLoadEvent } from './$types';
import type { User } from '../apis/auth';
import * as cookie from 'cookie';

export type LayoutResponse = {
	user?: User;
	username?: string;
	repo?: string;
	authenticated: boolean;
	error: Error | string | undefined;
	locals?: { username: string };
	pathname?: string;
};
/** @type {import('./$types').LayoutServerLoad} */
export async function load(loadEvent: LayoutServerLoadEvent): Promise<LayoutResponse> {
	const auth = new Auth();
	const { request, url } = loadEvent;

	try {
		const cookies = cookie.parse(request.headers.get('cookie') || '');

		const { data, error, status } = await auth.GetUserWithSession(cookies['session_id']);
		if (data) {
			return {
				user: data,
				authenticated: true,
				locals: { username: data.username },
				pathname: url.pathname
			} as LayoutResponse;
		}
	} catch (error) {
		return {
			error: JSON.stringify(error.message),
			authenticated: false
		} as LayoutResponse;
	}
}
