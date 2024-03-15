import { Log } from '@apify/log';
import { SetStatusMessageOptions } from '@crawlee/types';
import { HttpClient } from './http_client';
import { RequestInterceptorFunction } from './interceptors';
import { ActorClient } from './resource_clients/actor';
import { ActorCollectionClient } from './resource_clients/actor_collection';
import { BuildClient } from './resource_clients/build';
import { BuildCollectionClient } from './resource_clients/build_collection';
import { DatasetClient } from './resource_clients/dataset';
import { DatasetCollectionClient } from './resource_clients/dataset_collection';
import { KeyValueStoreClient } from './resource_clients/key_value_store';
import { KeyValueStoreCollectionClient } from './resource_clients/key_value_store_collection';
import { LogClient } from './resource_clients/log';
import { RequestQueueClient, RequestQueueUserOptions } from './resource_clients/request_queue';
import { RequestQueueCollectionClient } from './resource_clients/request_queue_collection';
import { RunClient } from './resource_clients/run';
import { RunCollectionClient } from './resource_clients/run_collection';
import { ScheduleClient } from './resource_clients/schedule';
import { ScheduleCollectionClient } from './resource_clients/schedule_collection';
import { StoreCollectionClient } from './resource_clients/store_collection';
import { TaskClient } from './resource_clients/task';
import { TaskCollectionClient } from './resource_clients/task_collection';
import { UserClient } from './resource_clients/user';
import { WebhookClient } from './resource_clients/webhook';
import { WebhookCollectionClient } from './resource_clients/webhook_collection';
import { WebhookDispatchClient } from './resource_clients/webhook_dispatch';
import { WebhookDispatchCollectionClient } from './resource_clients/webhook_dispatch_collection';
import { Statistics } from './statistics';
/**
 * ApifyClient is the official library to access [Apify API](https://docs.apify.com/api/v2) from your
 * JavaScript applications. It runs both in Node.js and browser.
 */
export declare class ApifyClient {
    baseUrl: string;
    token?: string;
    stats: Statistics;
    logger: Log;
    httpClient: HttpClient;
    constructor(options?: ApifyClientOptions);
    private _options;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection
     */
    actors(): ActorCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object
     */
    actor(id: string): ActorClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-collection
     */
    builds(): BuildCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-object
     */
    build(id: string): BuildClient;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection
     */
    datasets(): DatasetCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset
     */
    dataset<Data extends Record<string | number, any> = Record<string | number, unknown>>(id: string): DatasetClient<Data>;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection
     */
    keyValueStores(): KeyValueStoreCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object
     */
    keyValueStore(id: string): KeyValueStoreClient;
    /**
     * https://docs.apify.com/api/v2#/reference/logs
     */
    log(buildOrRunId: string): LogClient;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection
     */
    requestQueues(): RequestQueueCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue
     */
    requestQueue(id: string, options?: RequestQueueUserOptions): RequestQueueClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-collection
     */
    runs(): RunCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     */
    run(id: string): RunClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection
     */
    tasks(): TaskCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object
     */
    task(id: string): TaskClient;
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection
     */
    schedules(): ScheduleCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object
     */
    schedule(id: string): ScheduleClient;
    /**
     * https://docs.apify.com/api/v2#/reference/users
     */
    user(id?: string): UserClient;
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection
     */
    webhooks(): WebhookCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object
     */
    webhook(id: string): WebhookClient;
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches
     */
    webhookDispatches(): WebhookDispatchCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatch-object
     */
    webhookDispatch(id: string): WebhookDispatchClient;
    /**
     * https://docs.apify.com/api/v2/#/reference/store
     */
    store(): StoreCollectionClient;
    setStatusMessage(message: string, options?: SetStatusMessageOptions): Promise<void>;
}
export interface ApifyClientOptions {
    /** @default https://api.apify.com */
    baseUrl?: string;
    /** @default 8 */
    maxRetries?: number;
    /** @default 500 */
    minDelayBetweenRetriesMillis?: number;
    /** @default [] */
    requestInterceptors?: RequestInterceptorFunction[];
    /** @default 360 */
    timeoutSecs?: number;
    token?: string;
}
//# sourceMappingURL=apify_client.d.ts.map