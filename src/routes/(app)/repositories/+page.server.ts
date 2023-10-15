import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals, cookies }) => {
    await parent();

    if (!locals.user) {
        cookies.getAll().forEach((c) => {
            cookies.delete(c.name);
        });
        throw redirect(303, '/');
    }

    const { repositories, total } = await locals.openRegistry.getUserRepositoryCatalog()
    // const uri = new URL('/apis/registry/list/catalog', url.origin);
    // uri.searchParams.set('namespace', locals.user.username);
    // uri.searchParams.set('page_size', DefaultPageSize.toString());
    // uri.searchParams.set('offset', (DefaultPageSize * 0).toString());
    // const response = await fetch(uri);

    return {
        user: locals.user,
        isAuthenticated: locals.authenticated,
        repositories,
        total,
        error: null
    };
};
