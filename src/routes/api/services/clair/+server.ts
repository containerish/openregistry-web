import type { RequestHandler } from './$types';
import { ClairService } from '@buf/containerish_openregistry.bufbuild_connect-es/services/yor/clair/v1/clair_connect';
import type { PromiseClient } from '@connectrpc/connect';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
    try {
        const { hash } = (await request.json()) as { hash: string; };
        if (!hash) {
            return json({ error: 'Invalid request, missing manifest hash' }, { status: 400 });
        }

        const clair = locals.vulnScanningClient as PromiseClient<typeof ClairService>;
        const response = await clair.submitManifestToScan({
            hash: hash,
        });

        return json(response.toJson(), { status: 200 });
    } catch (err) {
        return json({ error: (err as Error).message }, { status: 400 });
    }
};

export const GET: RequestHandler = async ({ url, locals }) => {
    try {
        const hash = url.searchParams.get('hash');
        if (!hash) {
            return json({ error: 'Invalid request, missing manifest hash' }, { status: 400 });
        }

        const clair = locals.vulnScanningClient as PromiseClient<typeof ClairService>;
        const response = await clair.getVulnerabilityReport({
            manifestId: hash,
        });

        return json(response.toJson(), { status: 200 });
    } catch (err) {
        return json({ error: (err as Error).message }, { status: 400 });
    }
};
