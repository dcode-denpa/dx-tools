"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQueueClient = void 0;
const tslib_1 = require("tslib");
const consts_1 = require("@apify/consts");
const log_1 = tslib_1.__importDefault(require("@apify/log"));
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
const DEFAULT_PARALLEL_BATCH_ADD_REQUESTS = 5;
const DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS = 3;
const DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS = 500;
const DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT = 1000;
const SAFETY_BUFFER_PERCENT = 0.01 / 100; // 0.01%
class RequestQueueClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options, userOptions = {}) {
        super({
            resourcePath: 'request-queues',
            ...options,
        });
        Object.defineProperty(this, "clientKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.clientKey = userOptions.clientKey;
        this.timeoutMillis = userOptions.timeoutSecs ? userOptions.timeoutSecs * 1e3 : undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/get-request-queue
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/update-request-queue
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/delete-request-queue
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-head/get-head
     */
    async listHead(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('head'),
            method: 'GET',
            timeout: this.timeoutMillis,
            params: this._params({
                limit: options.limit,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-head-with-locks/get-head-and-lock
     */
    async listAndLockHead(options) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            lockSecs: ow_1.default.number,
            limit: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('head/lock'),
            method: 'POST',
            timeout: this.timeoutMillis,
            params: this._params({
                limit: options.limit,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/add-request
     */
    async addRequest(request, options = {}) {
        (0, ow_1.default)(request, ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url('requests'),
            method: 'POST',
            timeout: this.timeoutMillis,
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Writes requests to request queue in batch.
     *
     * @private
     */
    async _batchAddRequests(requests, options = {}) {
        (0, ow_1.default)(requests, ow_1.default.array.ofType(ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        })).minLength(1).maxLength(consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'POST',
            timeout: this.timeoutMillis,
            data: requests,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(data)));
    }
    async _batchAddRequestsWithRetries(requests, options = {}) {
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS, } = options;
        // Keep track of the requests that remain to be processed (in parameter format)
        let remainingRequests = requests;
        // Keep track of the requests that have been processed (in api format)
        const processedRequests = [];
        // The requests we have not been able to process in the last call
        // ie. those we have not been able to process at all
        let unprocessedRequests = [];
        for (let i = 0; i < 1 + maxUnprocessedRequestsRetries; i++) {
            try {
                const response = await this._batchAddRequests(remainingRequests, {
                    forefront,
                });
                processedRequests.push(...response.processedRequests);
                unprocessedRequests = response.unprocessedRequests;
                // Consider request with unprocessed requests as rate limited.
                // NOTE: This is important for SDK, the rate limit errors are read by AutoScalePool and used to potentially downscale.
                if (unprocessedRequests.length !== 0) {
                    this.httpClient.stats.addRateLimitError(i + 1);
                }
                // Get unique keys of all requests processed so far
                const processedRequestsUniqueKeys = processedRequests.map(({ uniqueKey }) => uniqueKey);
                // Requests remaining to be processed are the all that remain
                remainingRequests = requests.filter(({ uniqueKey }) => !processedRequestsUniqueKeys.includes(uniqueKey));
                // Stop if all requests have been processed
                if (remainingRequests.length === 0) {
                    break;
                }
            }
            catch (err) {
                log_1.default.exception(err, 'Request batch insert failed');
                // When something fails and http client does not retry, the remaining requests are treated as unprocessed.
                // This ensures that this method does not throw and keeps the signature.
                const processedRequestsUniqueKeys = processedRequests.map(({ uniqueKey }) => uniqueKey);
                unprocessedRequests = requests
                    .filter(({ uniqueKey }) => !processedRequestsUniqueKeys.includes(uniqueKey))
                    .map(({ method, uniqueKey, url }) => ({ method, uniqueKey, url }));
                break;
            }
            // Exponential backoff
            const delayMillis = Math.floor((1 + Math.random()) * (2 ** i) * minDelayBetweenUnprocessedRequestsRetriesMillis);
            await new Promise((resolve) => setTimeout(resolve, delayMillis));
        }
        const result = { processedRequests, unprocessedRequests };
        return (0, utils_1.cast)((0, utils_1.parseDateFields)(result));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations/add-requests
     */
    async batchAddRequests(requests, options = {}) {
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, maxParallel = DEFAULT_PARALLEL_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS, } = options;
        (0, ow_1.default)(requests, ow_1.default.array.ofType(ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        })).minLength(1));
        (0, ow_1.default)(forefront, ow_1.default.optional.boolean);
        (0, ow_1.default)(maxUnprocessedRequestsRetries, ow_1.default.optional.number);
        (0, ow_1.default)(maxParallel, ow_1.default.optional.number);
        (0, ow_1.default)(minDelayBetweenUnprocessedRequestsRetriesMillis, ow_1.default.optional.number);
        const executingRequests = new Set();
        const individualResults = [];
        const payloadSizeLimitBytes = consts_1.MAX_PAYLOAD_SIZE_BYTES - Math.ceil(consts_1.MAX_PAYLOAD_SIZE_BYTES * SAFETY_BUFFER_PERCENT);
        // Keep a pool of up to `maxParallel` requests running at once
        let i = 0;
        while (i < requests.length) {
            const slicedRequests = requests.slice(i, i + consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION);
            const requestsInBatch = (0, utils_1.sliceArrayByByteLength)(slicedRequests, payloadSizeLimitBytes, i);
            const requestPromise = this._batchAddRequestsWithRetries(requestsInBatch, options);
            executingRequests.add(requestPromise);
            void requestPromise.then((batchAddResult) => {
                executingRequests.delete(requestPromise);
                individualResults.push(batchAddResult);
            });
            if (executingRequests.size >= maxParallel) {
                await Promise.race(executingRequests);
            }
            i += requestsInBatch.length;
        }
        // Get results from remaining operations
        await Promise.all(executingRequests);
        // Combine individual results together
        const result = {
            processedRequests: [],
            unprocessedRequests: [],
        };
        individualResults.forEach(({ processedRequests, unprocessedRequests }) => {
            result.processedRequests.push(...processedRequests);
            result.unprocessedRequests.push(...unprocessedRequests);
        });
        return result;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations/delete-requests
     */
    async batchDeleteRequests(requests) {
        (0, ow_1.default)(requests, ow_1.default.array.ofType(ow_1.default.any(ow_1.default.object.partialShape({ id: ow_1.default.string }), ow_1.default.object.partialShape({ uniqueKey: ow_1.default.string }))).minLength(1).maxLength(consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'DELETE',
            timeout: this.timeoutMillis,
            data: requests,
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request/get-request
     */
    async getRequest(id) {
        (0, ow_1.default)(id, ow_1.default.string);
        const requestOpts = {
            url: this._url(`requests/${id}`),
            method: 'GET',
            timeout: this.timeoutMillis,
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request/update-request
     */
    async updateRequest(request, options = {}) {
        (0, ow_1.default)(request, ow_1.default.object.partialShape({
            id: ow_1.default.string,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${request.id}`),
            method: 'PUT',
            timeout: this.timeoutMillis,
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    async deleteRequest(id) {
        (0, ow_1.default)(id, ow_1.default.string);
        await this.httpClient.call({
            url: this._url(`requests/${id}`),
            method: 'DELETE',
            timeout: this.timeoutMillis,
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-lock/prolong-request-lock
     */
    async prolongRequestLock(id, options) {
        (0, ow_1.default)(id, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            lockSecs: ow_1.default.number,
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'PUT',
            timeout: this.timeoutMillis,
            params: this._params({
                forefront: options.forefront,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-lock/delete-request-lock
     */
    async deleteRequestLock(id, options = {}) {
        (0, ow_1.default)(id, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'DELETE',
            timeout: this.timeoutMillis,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/list-requests
     */
    async listRequests(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            exclusiveStartId: ow_1.default.optional.string,
        }));
        const response = await this.httpClient.call({
            url: this._url('requests'),
            method: 'GET',
            timeout: this.timeoutMillis,
            params: this._params({
                limit: options.limit,
                exclusiveStartId: options.exclusiveStartId,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/list-requests
     *
     * Usage:
     * for await (const { items } of client.paginateRequests({ limit: 10 })) {
     *   items.forEach((request) => console.log(request));
     * }
     */
    paginateRequests(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            maxPageLimit: ow_1.default.optional.number,
            exclusiveStartId: ow_1.default.optional.string,
        }));
        const { limit, exclusiveStartId, maxPageLimit = DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT } = options;
        return new utils_1.PaginationIterator({
            getPage: this.listRequests.bind(this),
            limit,
            exclusiveStartId,
            maxPageLimit,
        });
    }
}
exports.RequestQueueClient = RequestQueueClient;
//# sourceMappingURL=request_queue.js.map