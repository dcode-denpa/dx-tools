import { ACT_JOB_STATUSES } from '@apify/consts';
import { ActorRunListItem } from './actor';
import { ApiClientOptionsWithOptionalResourcePath } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class RunCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientOptionsWithOptionalResourcePath);
    /**
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/get-list-of-runs
     */
    list(options?: RunCollectionListOptions): Promise<PaginatedList<ActorRunListItem>>;
}
export interface RunCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
    status?: keyof typeof ACT_JOB_STATUSES;
}
//# sourceMappingURL=run_collection.d.ts.map