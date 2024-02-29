import { Build } from './build';
import { ApiClientOptionsWithOptionalResourcePath } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class BuildCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientOptionsWithOptionalResourcePath);
    /**
     * https://docs.apify.com/api/v2#/reference/actors/build-collection/get-list-of-builds
     */
    list(options?: BuildCollectionClientListOptions): Promise<BuildCollectionClientListResult>;
}
export interface BuildCollectionClientListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}
export type BuildCollectionClientListItem = Required<Pick<Build, 'id' | 'status' | 'startedAt' | 'finishedAt'>> & Partial<Pick<Build, 'meta' | 'usageTotalUsd'>>;
export type BuildCollectionClientListResult = PaginatedList<BuildCollectionClientListItem>;
//# sourceMappingURL=build_collection.d.ts.map