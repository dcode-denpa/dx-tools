import { Webhook, WebhookUpdateData } from './webhook';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class WebhookCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/get-list-of-webhooks
     */
    list(options?: WebhookCollectionListOptions): Promise<PaginatedList<Omit<Webhook, 'payloadTemplate' | 'headersTemplate'>>>;
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/create-webhook
     */
    create(webhook?: WebhookUpdateData): Promise<Webhook>;
}
export interface WebhookCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}
//# sourceMappingURL=webhook_collection.d.ts.map