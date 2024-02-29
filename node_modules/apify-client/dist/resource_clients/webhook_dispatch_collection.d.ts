import { WebhookDispatch } from './webhook_dispatch';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class WebhookDispatchCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatches-collection/get-list-of-webhook-dispatches
     */
    list(options?: WebhookDispatchCollectionListOptions): Promise<PaginatedList<WebhookDispatch>>;
}
export interface WebhookDispatchCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}
//# sourceMappingURL=webhook_dispatch_collection.d.ts.map