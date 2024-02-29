import { ActorEnvironmentVariable } from './actor_version';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class ActorEnvVarClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/get-environment-variable
     */
    get(): Promise<ActorEnvironmentVariable | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/update-environment-variable
     */
    update(actorEnvVar: ActorEnvironmentVariable): Promise<ActorEnvironmentVariable>;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/delete-environment-variable
     */
    delete(): Promise<void>;
}
//# sourceMappingURL=actor_env_var.d.ts.map