import { Timestamp } from '@bufbuild/protobuf'
import { z } from 'zod'

export const ProtoUUIDWrapper = z.object({
    value: z.string().uuid(),
})

export const BuildSettings = z.object({
    buildTool: z.string(),
    execCommand: z.string(),
    worfklowFile: z.string(),
})

export const BuildEnvironmentVariables = z.object({
    environmentVariables: z.array(z.object({ key: z.string(), value: z.string() }))
})

export const CreateProject = z.object({
    id: ProtoUUIDWrapper,
    ownerId: ProtoUUIDWrapper,
    createdAt: z.date().optional().transform(ts => {
        if (ts) {
            return Timestamp.fromDate(ts)
        }

        return Timestamp.now()
    }),
    projectName: z.string(),
    buildSettings: BuildSettings,
    productionBranch: z.string(),
    environmentVariables: BuildEnvironmentVariables,
})

export type ProtoUUIDWrapper = z.infer<typeof ProtoUUIDWrapper>
export type BuildSettings = z.infer<typeof BuildSettings>
export type BuildEnvironmentVariables = z.infer<typeof BuildEnvironmentVariables>
export type CreateRepository = z.infer<typeof CreateProject>
