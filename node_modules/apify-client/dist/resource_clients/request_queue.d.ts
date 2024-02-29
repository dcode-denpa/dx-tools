import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class RequestQueueClient extends ResourceClient {
    private clientKey?;
    private timeoutMillis?;
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions, userOptions?: RequestQueueUserOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/get-request-queue
     */
    get(): Promise<RequestQueue | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/update-request-queue
     */
    update(newFields: RequestQueueClientUpdateOptions): Promise<RequestQueue>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/delete-request-queue
     */
    delete(): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-head/get-head
     */
    listHead(options?: RequestQueueClientListHeadOptions): Promise<RequestQueueClientListHeadResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-head-with-locks/get-head-and-lock
     */
    listAndLockHead(options: RequestQueueClientListAndLockHeadOptions): Promise<RequestQueueClientListAndLockHeadResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/add-request
     */
    addRequest(request: Omit<RequestQueueClientRequestSchema, 'id'>, options?: RequestQueueClientAddRequestOptions): Promise<RequestQueueClientAddRequestResult>;
    /**
     * Writes requests to request queue in batch.
     *
     * @private
     */
    protected _batchAddRequests(requests: Omit<RequestQueueClientRequestSchema, 'id'>[], options?: RequestQueueClientAddRequestOptions): Promise<RequestQueueClientBatchRequestsOperationResult>;
    protected _batchAddRequestsWithRetries(requests: Omit<RequestQueueClientRequestSchema, 'id'>[], options?: RequestQueueClientBatchAddRequestWithRetriesOptions): Promise<RequestQueueClientBatchRequestsOperationResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations/add-requests
     */
    batchAddRequests(requests: Omit<RequestQueueClientRequestSchema, 'id'>[], options?: RequestQueueClientBatchAddRequestWithRetriesOptions): Promise<RequestQueueClientBatchRequestsOperationResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations/delete-requests
     */
    batchDeleteRequests(requests: RequestQueueClientRequestToDelete[]): Promise<RequestQueueClientBatchRequestsOperationResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request/get-request
     */
    getRequest(id: string): Promise<RequestQueueClientGetRequestResult | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request/update-request
     */
    updateRequest(request: RequestQueueClientRequestSchema, options?: RequestQueueClientAddRequestOptions): Promise<RequestQueueClientAddRequestResult>;
    deleteRequest(id: string): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-lock/prolong-request-lock
     */
    prolongRequestLock(id: string, options: RequestQueueClientProlongRequestLockOptions): Promise<RequestQueueClientProlongRequestLockResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-lock/delete-request-lock
     */
    deleteRequestLock(id: string, options?: RequestQueueClientDeleteRequestLockOptions): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/list-requests
     */
    listRequests(options?: RequestQueueClientListRequestsOptions): Promise<RequestQueueClientListRequestsResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/list-requests
     *
     * Usage:
     * for await (const { items } of client.paginateRequests({ limit: 10 })) {
     *   items.forEach((request) => console.log(request));
     * }
     */
    paginateRequests(options?: RequestQueueClientPaginateRequestsOptions): RequestQueueRequestsAsyncIterable<RequestQueueClientListRequestsResult>;
}
export interface RequestQueueUserOptions {
    clientKey?: string;
    timeoutSecs?: number;
}
export interface RequestQueue {
    id: string;
    name?: string;
    title?: string;
    userId: string;
    createdAt: Date;
    modifiedAt: Date;
    accessedAt: Date;
    expireAt?: string;
    totalRequestCount: number;
    handledRequestCount: number;
    pendingRequestCount: number;
    actId?: string;
    actRunId?: string;
    hadMultipleClients: boolean;
    stats: RequestQueueStats;
}
export interface RequestQueueStats {
    readCount?: number;
    writeCount?: number;
    deleteCount?: number;
    headItemReadCount?: number;
    storageBytes?: number;
}
export interface RequestQueueClientUpdateOptions {
    name: string;
    title?: string;
}
export interface RequestQueueClientListHeadOptions {
    limit?: number;
}
export interface RequestQueueClientListHeadResult {
    limit: number;
    queueModifiedAt: Date;
    hadMultipleClients: boolean;
    items: RequestQueueClientListItem[];
}
export interface RequestQueueClientListRequestsOptions {
    limit?: number;
    exclusiveStartId?: string;
}
export interface RequestQueueClientPaginateRequestsOptions {
    limit?: number;
    maxPageLimit?: number;
    exclusiveStartId?: string;
}
export interface RequestQueueClientListRequestsResult {
    limit: number;
    exclusiveStartId?: string;
    items: RequestQueueClientRequestSchema[];
}
export interface RequestQueueClientListAndLockHeadOptions {
    lockSecs: number;
    limit?: number;
}
export interface RequestQueueClientListAndLockHeadResult extends RequestQueueClientListHeadResult {
    lockSecs: number;
}
export interface RequestQueueClientListItem {
    id: string;
    retryCount: number;
    uniqueKey: string;
    url: string;
    method: AllowedHttpMethods;
    lockExpiresAt?: Date;
}
export interface RequestQueueClientAddRequestOptions {
    forefront?: boolean;
}
export interface RequestQueueClientProlongRequestLockOptions {
    forefront?: boolean;
    lockSecs: number;
}
export interface RequestQueueClientDeleteRequestLockOptions {
    forefront?: boolean;
}
export interface RequestQueueClientProlongRequestLockResult {
    lockExpiresAt: Date;
}
export interface RequestQueueClientBatchAddRequestWithRetriesOptions {
    forefront?: boolean;
    maxUnprocessedRequestsRetries?: number;
    maxParallel?: number;
    minDelayBetweenUnprocessedRequestsRetriesMillis?: number;
}
export interface RequestQueueClientRequestSchema {
    id: string;
    uniqueKey: string;
    url: string;
    method?: AllowedHttpMethods;
    payload?: string;
    retryCount?: number;
    errorMessages?: string[];
    headers?: Record<string, string>;
    userData?: Record<string, unknown>;
    handledAt?: string;
    noRetry?: boolean;
    loadedUrl?: string;
}
export interface RequestQueueClientAddRequestResult {
    requestId: string;
    wasAlreadyPresent: boolean;
    wasAlreadyHandled: boolean;
}
interface ProcessedRequest {
    uniqueKey: string;
    requestId: string;
    wasAlreadyPresent: boolean;
    wasAlreadyHandled: boolean;
}
interface UnprocessedRequest {
    uniqueKey: string;
    url: string;
    method?: AllowedHttpMethods;
}
export interface RequestQueueClientBatchRequestsOperationResult {
    processedRequests: ProcessedRequest[];
    unprocessedRequests: UnprocessedRequest[];
}
export type RequestQueueClientRequestToDelete = Pick<RequestQueueClientRequestSchema, 'id'> | Pick<RequestQueueClientRequestSchema, 'uniqueKey'>;
export type RequestQueueClientGetRequestResult = Omit<RequestQueueClientListItem, 'retryCount'>;
export type AllowedHttpMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'OPTIONS' | 'CONNECT' | 'PATCH';
export type RequestQueueRequestsAsyncIterable<T> = AsyncIterable<T>;
export {};
//# sourceMappingURL=request_queue.d.ts.map