import { ActorEnvVarClient } from './actor_env_var';
import { ActorEnvVarCollectionClient } from './actor_env_var_collection';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class ActorVersionClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/get-version
     */
    get(): Promise<FinalActorVersion | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/update-version
     */
    update(newFields: ActorVersion): Promise<FinalActorVersion>;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/delete-version
     */
    delete(): Promise<void>;
    /**
     * TODO: https://docs.apify.com/api/v2#/reference/actors/env-var-object
     */
    envVar(envVarName: string): ActorEnvVarClient;
    /**
     * TODO: https://docs.apify.com/api/v2#/reference/actors/env-var-collection
     * @return {ActorVersionCollectionClient}
     */
    envVars(): ActorEnvVarCollectionClient;
}
export interface BaseActorVersion<SourceType extends ActorSourceType> {
    versionNumber?: string;
    sourceType: SourceType;
    envVars?: ActorEnvironmentVariable[];
    applyEnvVarsToBuild?: boolean;
    buildTag?: string;
}
export interface ActorVersionSourceFiles extends BaseActorVersion<ActorSourceType.SourceFiles> {
    sourceFiles: ActorVersionSourceFile[];
}
export interface ActorVersionSourceFile {
    name: string;
    format: 'TEXT' | 'BASE64';
    content: string;
}
export interface ActorVersionGitRepo extends BaseActorVersion<ActorSourceType.GitRepo> {
    gitRepoUrl: string;
}
export interface ActorVersionTarball extends BaseActorVersion<ActorSourceType.Tarball> {
    tarballUrl: string;
}
export interface ActorVersionGitHubGist extends BaseActorVersion<ActorSourceType.GitHubGist> {
    gitHubGistUrl: string;
}
export declare enum ActorSourceType {
    SourceFiles = "SOURCE_FILES",
    GitRepo = "GIT_REPO",
    Tarball = "TARBALL",
    GitHubGist = "GITHUB_GIST"
}
export interface ActorEnvironmentVariable {
    name?: string;
    value?: string;
    isSecret?: boolean;
}
export type ActorVersion = ActorVersionSourceFiles | ActorVersionGitRepo | ActorVersionTarball | ActorVersionGitHubGist;
export type FinalActorVersion = ActorVersion & Required<Pick<ActorVersion, 'versionNumber' | 'buildTag'>>;
//# sourceMappingURL=actor_version.d.ts.map