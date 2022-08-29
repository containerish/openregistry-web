import { error, redirect } from '@sveltejs/kit';
import { Auth } from '../apis/auth';
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';
import type { User } from '../apis/auth';
import * as cookie from 'cookie';

export type LayoutResponse = {
	user?: User;
	username?: string;
	repo?: string;
	authenticated: boolean;
	error: Error | string | undefined;
	locals?: { username: string };
};
/** @type {import('./$types').LayoutServerLoad} */
export async function load(loadEvent: LayoutServerLoadEvent): Promise<LayoutResponse> {
	const auth = new Auth();
	// const signinPath = url.pathname === '/search' ? url.pathname : undefined;
	// const u = new URLSearchParams(url.search);
	// const openSignInModal = u.get('signin');
	// const pathname: string = url.pathname;
	// console.log('signinpath: ', signinPath)
	const { request, url } = loadEvent;

	try {
		const cookies = cookie.parse(request.headers.get('cookie') || '');

		const { data, error, status } = await auth.GetUserWithSession(cookies['session_id']);
		if (data) {
			return {
				// signinPath: signinPath,
				// pathname: url.pathname,
				// openSignInModal: openSignInModal,
				// url: url,
				user: data,
				authenticated: true,
				locals: { username: data.username }
			} as LayoutResponse;
		}
	} catch (error) {
		return {
			// status: status,
			error: JSON.stringify(error.message),
			// url: url,
			authenticated: false
			// signinPath: signinPath,
			// pathname: url.pathname,
			// openSignInModal: openSignInModal,
		} as LayoutResponse;
	}
}
//
// import cookie from 'js-cookie';
// import {Auth} from '../apis/auth'
// /** @type {import('./$types').LayoutLoad} */
// import type { LayoutLoad } from './$types';
//
// export const load: LayoutLoad = async (obj) => {
// 	console.log("obj:", obj)
// 	// const signinPath = url.pathname === '/search' ? url.pathname : undefined;
// 	// const u = new URLSearchParams(url.search);
// 	// const openSignInModal = u.get('signin');
// 	// const pathname: string = url.pathname;
//
// 	// const sessionCookiePresent = cookie.get('session_id');
// 	// const pubPath = pathname.startsWith('/u/') && pathname.split('/').length >= 3;
// 	// if (pubPath && !sessionCookiePresent) {
// 	// 	return {
// 	// 		signinPath: signinPath,
// 	// 		pathname: url.pathname,
// 	// 		openSignInModal: openSignInModal,
// 	// 		authenticated: false
// 	// 	};
// 	// }
//
// 	// if (Auth.publicPaths.has(pathname) && !sessionCookiePresent) {
// 	// 	return {
// 	// 		signinPath: signinPath,
// 	// 		pathname: url.pathname,
// 	// 		openSignInModal: openSignInModal,
// 	// 		authenticated: false
// 	// 	};
// 	// }
//
// 	// TODO, handle properly
// };
