export async function load({ params, url }) {
	const slug = params.slug;
	const u = new URLSearchParams(url.search);

	return {
		slug: slug,
		token: u.get('token'),
		unhandledErr: u.get('error')
	};
}
