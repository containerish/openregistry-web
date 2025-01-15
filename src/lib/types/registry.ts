import { OpenRegistryUserSchema, OpenRegistryUserType } from '$lib/formSchemas';
import { z } from 'zod';

export const RegistryDescriptor = z.object({
	mediaType: z.string(),
	digest: z.string(),
	size: z.number(),
});

export const ImageManifest = z.object({
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullish(),
	digest: z.string(),
	repositoryId: z.string(),
	mediaType: z.string(),
	id: z.string(),
	reference: z.string(),
	layers: z.array(RegistryDescriptor).nullish().default([]),
	schemaVersion: z.number(),
	size: z.number(),
	ownerId: z.string(),
	user: OpenRegistryUserType.nullish(),
	config: RegistryDescriptor,
});

export type ImageManifest = z.infer<typeof ImageManifest>;

export const Repository = z.object({
	created_at: z.coerce.date(),
	updated_at: z.coerce.date().nullish(),
	meta_tags: z.record(z.string(), z.string()).nullish(),
	user: OpenRegistryUserSchema.nullish(),
	name: z.string(),
	visibility: z.enum(['Private', 'Public']),
	description: z.string().default(''),
	image_manifests: z.array(ImageManifest).nullish().default([]),
	pull_count: z.number().default(0),
	favorite_count: z.number().default(0),
	id: z.string(),
	owner_id: z.string(),
});

export type Repository = z.infer<typeof Repository>;

export const RepositoryList = z.array(Repository);
export type RepositoryList = z.infer<typeof RepositoryList>;

export const RepositoryCatalog = z.object({
	repositories: z.array(Repository).nullish().default([]),
	total: z.number(),
});

export const RegistryAPIError = z
	.object({
		error: z.string(),
		message: z.string().optional(),
	})
	.nullish();

export type RegistryAPIError = z.infer<typeof RegistryAPIError>;

export type RepositoryCatalog = z.infer<typeof RepositoryCatalog>;

export type RepositoryCatalogResponse = RepositoryCatalog & RegistryAPIError;

export const CreateRepositoryResponse = z
	.object({
		message: z.string(),
		error: z.string().optional(),
	})
	.or(
		z.object({
			message: z.string().optional(),
			error: z.string(),
		})
	);

export const RepositoryVisibility = z.enum(['Public', 'Private'] as const);

export const CreateReposioryRequest = z.object({
	name: z.string(),
	description: z.string(),
	visibility: RepositoryVisibility,
});

export type RepositoryVisibility = z.infer<typeof RepositoryVisibility>;
export type CreateReposioryRequest = z.infer<typeof CreateReposioryRequest>;

export const SearchRepositoryResponse = z.object({
	total: z.number(),
	repositories: z.array(Repository),
});

export type SearchRepositoryResponse = z.infer<typeof SearchRepositoryResponse>;
