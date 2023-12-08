import { Program } from './IAST';

export type Runtime =
    | "VCode2"

export interface App {
    program: Program,
    metadata: Metadata,
    runtime: Runtime
}

export interface Metadata {
    name: string,
    creatorId: string,
    creatorName: string
}