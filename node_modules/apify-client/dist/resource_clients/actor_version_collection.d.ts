import { ActorVersion, FinalActorVersion } from './actor_version';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class ActorVersionCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/get-list-of-versions
     */
    list(options?: ActorVersionCollectionListOptions): Promise<ActorVersionListResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/create-version
     */
    create(actorVersion: ActorVersion): Promise<FinalActorVersion>;
}
export interface ActorVersionCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}
export type ActorVersionListResult = Pick<PaginatedList<FinalActorVersion>, 'total' | 'items'>;
//# sourceMappingURL=actor_version_collection.d.ts.map