import HttpClient from './httpClient';
import { PUBLIC_OPEN_REGISTRY_SUPPORT_ENDPOINT, PUBLIC_OPEN_REGISTRY_SUPPORT_API_KEY } from '$env/static/public';
import { env } from '$env/dynamic/public';

export type Ticket = {
	description: string;
	subject: string;
	email: string;
	priority: number;
	status: number;
	cc_emails: string[];
};

export class Support extends HttpClient {
	protected apiKey: string;
	public constructor() {
		const supportEndpoint = PUBLIC_OPEN_REGISTRY_SUPPORT_ENDPOINT;
		const supportAPIKey = PUBLIC_OPEN_REGISTRY_SUPPORT_API_KEY;

		if (!supportEndpoint) {
			throw Error('Support API Endpoint not provided');
		}

		if (!supportAPIKey) {
			throw Error('Support Platform API key not provided');
		}

		super(supportEndpoint.toString());
		this.apiKey = supportAPIKey;
	}

	public CreateNewTicket = async (description: string, subject: string, email: string) => {
		const path = '/tickets';

		const data: Ticket = {
			description: description,
			subject: subject,
			email: email,
			priority: 1,
			status: 2,
			cc_emails: (env.PUBLIC_OPEN_REGISTRY_SUPPORT_EMAILS ?? '').split(','),
		};

		const resp = await this.http.post(path, data, {
			auth: {
				username: this.apiKey,
				password: 'password-is-not-needed',
			},
		});
		return resp;
	};
}
