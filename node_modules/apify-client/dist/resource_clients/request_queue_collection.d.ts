import { RequestQueue } from './request_queue';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class RequestQueueCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/get-list-of-request-queues
     */
    list(options?: RequestQueueCollectionListOptions): Promise<RequestQueueCollectionListResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/create-request-queue
     */
    getOrCreate(name?: string): Promise<RequestQueue>;
}
export interface RequestQueueCollectionListOptions {
    unnamed?: boolean;
    limit?: number;
    offset?: number;
    desc?: boolean;
}
export type RequestQueueCollectionListResult = PaginatedList<RequestQueue & {
    username?: string;
}> & {
    unnamed: boolean;
};
//# sourceMappingURL=request_queue_collection.d.ts.map