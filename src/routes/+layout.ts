import cookie from 'js-cookie';
import {Auth} from '../apis/auth'
/** @type {import('./$types').LayoutLoad} */
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (obj) => {
	console.log("obj:", obj)
	// const signinPath = url.pathname === '/search' ? url.pathname : undefined;
	// const u = new URLSearchParams(url.search);
	// const openSignInModal = u.get('signin');
	// const pathname: string = url.pathname;

	// const sessionCookiePresent = cookie.get('session_id');
	// const pubPath = pathname.startsWith('/u/') && pathname.split('/').length >= 3;
	// if (pubPath && !sessionCookiePresent) {
	// 	return {
	// 		signinPath: signinPath,
	// 		pathname: url.pathname,
	// 		openSignInModal: openSignInModal,
	// 		authenticated: false
	// 	};
	// }

	// if (Auth.publicPaths.has(pathname) && !sessionCookiePresent) {
	// 	return {
	// 		signinPath: signinPath,
	// 		pathname: url.pathname,
	// 		openSignInModal: openSignInModal,
	// 		authenticated: false
	// 	};
	// }

	// TODO, handle properly
};
