import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, cookies, request }) => {
	const body = (await request.json()) as { repo: string; id: string };
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const sessionId = cookies.get('session_id')!;
	const ownerId = sessionId.split(':')[1];
	const builds = await locals.ghBuildClient.listBuildJobs({
		id: body.id,
		repo: body.repo,
		ownerId: ownerId
	});

	const singleJob = await locals.ghBuildClient.getBuildJob({
		ownerId: ownerId,
		repo: body.repo,
		jobId: builds.jobs[0].id
	});
	console.log('singleJob: ', singleJob);

	return json(builds, { status: 200 });
};
