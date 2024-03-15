"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskClient = void 0;
const tslib_1 = require("tslib");
const consts_1 = require("@apify/consts");
const ow_1 = tslib_1.__importDefault(require("ow"));
const run_1 = require("./run");
const run_collection_1 = require("./run_collection");
const webhook_collection_1 = require("./webhook_collection");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class TaskClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-tasks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/get-task
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/update-task
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/delete-task
     */
    async delete() {
        return this._delete();
    }
    /**
     * Starts a task and immediately returns the Run object.
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection/run-task
     */
    async start(input, options = {}) {
        (0, ow_1.default)(input, ow_1.default.optional.object);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
            waitForFinish: ow_1.default.optional.number,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
        }));
        const { waitForFinish, timeout, memory, build, maxItems } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0, utils_1.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            stringifyFunctions: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Starts a task and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection/run-task
     */
    async call(input, options = {}) {
        (0, ow_1.default)(input, ow_1.default.optional.object);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number.not.negative,
            waitSecs: ow_1.default.optional.number.not.negative,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
        }));
        const { waitSecs, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under task API.
        return this.apifyClient.run(id).waitForFinish({ waitSecs });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-input-object/get-task-input
     */
    async getInput() {
        const requestOpts = {
            url: this._url('input'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-input-object/update-task-input
     */
    async updateInput(newFields) {
        const response = await this.httpClient.call({
            url: this._url('input'),
            method: 'PUT',
            params: this._params(),
            data: newFields,
        });
        return (0, utils_1.cast)(response.data);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/last-run-object-and-its-storages
     */
    lastRun(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            status: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACT_JOB_STATUSES)),
            origin: ow_1.default.optional.string.oneOf(Object.values(consts_1.META_ORIGINS)),
        }));
        return new run_1.RunClient(this._subResourceOptions({
            id: 'last',
            params: this._params(options),
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection
     */
    runs() {
        return new run_collection_1.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/webhook-collection
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._subResourceOptions());
    }
}
exports.TaskClient = TaskClient;
//# sourceMappingURL=task.js.map