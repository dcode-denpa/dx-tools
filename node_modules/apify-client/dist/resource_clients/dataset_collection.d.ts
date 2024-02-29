import { Dataset } from './dataset';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class DatasetCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/get-list-of-datasets
     */
    list(options?: DatasetCollectionClientListOptions): Promise<DatasetCollectionClientListResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/create-dataset
     */
    getOrCreate(name?: string, options?: DatasetCollectionClientGetOrCreateOptions): Promise<Dataset>;
}
export interface DatasetCollectionClientListOptions {
    unnamed?: boolean;
    limit?: number;
    offset?: number;
    desc?: boolean;
}
export interface DatasetCollectionClientGetOrCreateOptions {
    schema?: Record<string, unknown>;
}
export type DatasetCollectionClientListResult = PaginatedList<Dataset>;
//# sourceMappingURL=dataset_collection.d.ts.map