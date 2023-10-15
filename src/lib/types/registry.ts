import { z } from 'zod';

export const ImageManifest = z.object({
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    digest: z.string(),
    repository_id: z.string(),
    media_type: z.string(),
    id: z.string(),
    reference: z.string(),
    dfs_link: z.string(),
    layers: z.array(z.string()).nullish(),
    schema_version: z.number(),
    size: z.number(),
    owner_id: z.string()
});

export type ImageManifest = z.infer<typeof ImageManifest>;

export const Repository = z.object({
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    meta_tags: z.record(z.string(), z.unknown()).nullish(),
    id: z.string(),
    name: z.string(),
    description: z.string().default(''),
    visibility: z.enum(['Private', 'Public']),
    owner_id: z.string(),
    image_manifests: z.array(ImageManifest).nullish()
});

export type Repository = z.infer<typeof Repository>;

export const RepositoryCatalog = z.object({
    repositories: z.array(Repository),
    total: z.number()
});

export const RegistryAPIError = z
    .object({
        error: z.string(),
        message: z.string().optional()
    })
    .nullish();

export type RegistryAPIError = z.infer<typeof RegistryAPIError>;

export type RepositoryCatalog = z.infer<typeof RepositoryCatalog>;

export type RepositoryCatalogResponse = RepositoryCatalog & RegistryAPIError;

export const CreateRepositoryResponse = z
    .object({
        message: z.string(),
        error: z.string().optional()
    })
    .or(
        z.object({
            message: z.string().optional(),
            error: z.string()
        })
    );

export const RepositoryVisibility = z.enum(['Public', 'Private'] as const)

export const CreateReposioryRequest = z.object({
    name: z.string(),
    description: z.string(),
    visibility: RepositoryVisibility,
})

export type RepositoryVisibility = z.infer<typeof RepositoryVisibility>
export type CreateReposioryRequest = z.infer<typeof CreateReposioryRequest>
