export type Repository = {
	uuid: string;
	namespace: string;
	mediaType: string;
	schemaVersion: number;
	created_at: Date;
	updated_at: Date;
};

export interface TagList {
	name: string;
	tags: string[];
}

export interface Catalog {
	repositories: Repository[];
	total: number;
}

export interface DetailedRepository {
	uuid: string;
	namespace: string;
	reference: string;
	digest: string;
	sky_link: string;
	media_type: string;
	layers: null;
	size: number;
	created_at: Date;
	updated_at: Date;
}

export type Repo = {
	namespace: string;
	tags: Tag[];
};

export type Tag = {
	size: number;
	created_at: string;
	updated_at: string;
	namespace: string;
	sky_link: string;
	reference: string;
	digest: string;
};
