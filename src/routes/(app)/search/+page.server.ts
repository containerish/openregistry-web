import type { PageServerLoad } from "./$types";

export const load = (async ({url, locals}) => {
    return {
        query: url.searchParams.get('q'),
        authenticated: locals.authenticated
    }
}) satisfies PageServerLoad