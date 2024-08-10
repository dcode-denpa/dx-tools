"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApifyClient = void 0;
const tslib_1 = require("tslib");
const consts_1 = require("@apify/consts");
const log_1 = tslib_1.__importDefault(require("@apify/log"));
const ow_1 = tslib_1.__importDefault(require("ow"));
const http_client_1 = require("./http_client");
const actor_1 = require("./resource_clients/actor");
const actor_collection_1 = require("./resource_clients/actor_collection");
const build_1 = require("./resource_clients/build");
const build_collection_1 = require("./resource_clients/build_collection");
const dataset_1 = require("./resource_clients/dataset");
const dataset_collection_1 = require("./resource_clients/dataset_collection");
const key_value_store_1 = require("./resource_clients/key_value_store");
const key_value_store_collection_1 = require("./resource_clients/key_value_store_collection");
const log_2 = require("./resource_clients/log");
const request_queue_1 = require("./resource_clients/request_queue");
const request_queue_collection_1 = require("./resource_clients/request_queue_collection");
const run_1 = require("./resource_clients/run");
const run_collection_1 = require("./resource_clients/run_collection");
const schedule_1 = require("./resource_clients/schedule");
const schedule_collection_1 = require("./resource_clients/schedule_collection");
const store_collection_1 = require("./resource_clients/store_collection");
const task_1 = require("./resource_clients/task");
const task_collection_1 = require("./resource_clients/task_collection");
const user_1 = require("./resource_clients/user");
const webhook_1 = require("./resource_clients/webhook");
const webhook_collection_1 = require("./resource_clients/webhook_collection");
const webhook_dispatch_1 = require("./resource_clients/webhook_dispatch");
const webhook_dispatch_collection_1 = require("./resource_clients/webhook_dispatch_collection");
const statistics_1 = require("./statistics");
/**
 * ApifyClient is the official library to access [Apify API](https://docs.apify.com/api/v2) from your
 * JavaScript applications. It runs both in Node.js and browser.
 */
class ApifyClient {
    constructor(options = {}) {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            baseUrl: ow_1.default.optional.string,
            maxRetries: ow_1.default.optional.number,
            minDelayBetweenRetriesMillis: ow_1.default.optional.number,
            requestInterceptors: ow_1.default.optional.array,
            timeoutSecs: ow_1.default.optional.number,
            token: ow_1.default.optional.string,
        }));
        const { baseUrl = 'https://api.apify.com', maxRetries = 8, minDelayBetweenRetriesMillis = 500, requestInterceptors = [], timeoutSecs = 360, token, } = options;
        const tempBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, baseUrl.length - 1) : baseUrl;
        this.baseUrl = `${tempBaseUrl}/v2`;
        this.token = token;
        this.stats = new statistics_1.Statistics();
        this.logger = log_1.default.child({ prefix: 'ApifyClient' });
        this.httpClient = new http_client_1.HttpClient({
            apifyClientStats: this.stats,
            maxRetries,
            minDelayBetweenRetriesMillis,
            requestInterceptors,
            timeoutSecs,
            logger: this.logger,
            token: this.token,
        });
    }
    _options() {
        return {
            baseUrl: this.baseUrl,
            apifyClient: this,
            httpClient: this.httpClient,
        };
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection
     */
    actors() {
        return new actor_collection_1.ActorCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object
     */
    actor(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new actor_1.ActorClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-collection
     */
    builds() {
        return new build_collection_1.BuildCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-object
     */
    build(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new build_1.BuildClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection
     */
    datasets() {
        return new dataset_collection_1.DatasetCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset
     */
    dataset(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new dataset_1.DatasetClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection
     */
    keyValueStores() {
        return new key_value_store_collection_1.KeyValueStoreCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object
     */
    keyValueStore(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new key_value_store_1.KeyValueStoreClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/logs
     */
    log(buildOrRunId) {
        (0, ow_1.default)(buildOrRunId, ow_1.default.string.nonEmpty);
        return new log_2.LogClient({
            id: buildOrRunId,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection
     */
    requestQueues() {
        return new request_queue_collection_1.RequestQueueCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue
     */
    requestQueue(id, options = {}) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clientKey: ow_1.default.optional.string.nonEmpty,
            timeoutSecs: ow_1.default.optional.number,
        }));
        const apiClientOptions = {
            id,
            ...this._options(),
        };
        return new request_queue_1.RequestQueueClient(apiClientOptions, options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-collection
     */
    runs() {
        return new run_collection_1.RunCollectionClient({
            ...this._options(),
            resourcePath: 'actor-runs',
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     */
    run(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new run_1.RunClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection
     */
    tasks() {
        return new task_collection_1.TaskCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object
     */
    task(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new task_1.TaskClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection
     */
    schedules() {
        return new schedule_collection_1.ScheduleCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object
     */
    schedule(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new schedule_1.ScheduleClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/users
     */
    user(id = consts_1.ME_USER_NAME_PLACEHOLDER) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new user_1.UserClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object
     */
    webhook(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new webhook_1.WebhookClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches
     */
    webhookDispatches() {
        return new webhook_dispatch_collection_1.WebhookDispatchCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatch-object
     */
    webhookDispatch(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new webhook_dispatch_1.WebhookDispatchClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/store
     */
    store() {
        return new store_collection_1.StoreCollectionClient(this._options());
    }
    async setStatusMessage(message, options) {
        const runId = process.env[consts_1.ACTOR_ENV_VARS.RUN_ID];
        if (!runId) {
            throw new Error(`Environment variable ${consts_1.ACTOR_ENV_VARS.RUN_ID} is not set!`);
        }
        await this.run(runId).update({
            statusMessage: message,
            ...options,
        });
    }
}
exports.ApifyClient = ApifyClient;
//# sourceMappingURL=apify_client.js.map