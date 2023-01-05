import { error, fail } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from '../$types';

export const load = async (event: LayoutServerLoadEvent) => {
	const { locals, parent } = event;
	await parent();
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	throw error(401, {
		message: 'please login'
	});
};
