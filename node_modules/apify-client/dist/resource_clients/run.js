"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const dataset_1 = require("./dataset");
const key_value_store_1 = require("./key_value_store");
const log_1 = require("./log");
const request_queue_1 = require("./request_queue");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class RunClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-runs',
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object/get-run
     */
    async get(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitForFinish: ow_1.default.optional.number,
        }));
        return this._get(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/abort-run/abort-run
     */
    async abort(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            gracefully: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params(options),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/delete-run/delete-run
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/metamorph-run/metamorph-run
     */
    async metamorph(targetActorId, input, options = {}) {
        (0, ow_1.default)(targetActorId, ow_1.default.string);
        // input can be anything, pointless to validate
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            contentType: ow_1.default.optional.string,
            build: ow_1.default.optional.string,
        }));
        const safeTargetActorId = this._toSafeId(targetActorId);
        const params = {
            targetActorId: safeTargetActorId,
            build: options.build,
        };
        const request = {
            url: this._url('metamorph'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            // TODO: remove this ts-expect-error once we have defined custom Apify axios configs
            // @ts-expect-error Custom Apify property
            stringifyFunctions: true,
        };
        if (options.contentType) {
            request.headers = {
                'content-type': options.contentType,
            };
        }
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/reboot-run/reboot-run
     */
    async reboot() {
        const request = {
            url: this._url('reboot'),
            method: 'POST',
        };
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/resurrect-run/resurrect-run
     */
    async resurrect(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('resurrect'),
            method: 'POST',
            params: this._params(options),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Returns a promise that resolves with the finished Run object when the provided actor run finishes
     * or with the unfinished Run object when the `waitSecs` timeout lapses. The promise is NOT rejected
     * based on run status. You can inspect the `status` property of the Run object to find out its status.
     *
     * The difference between this function and the `waitForFinish` parameter of the `get` method
     * is the fact that this function can wait indefinitely. Its use is preferable to the
     * `waitForFinish` parameter alone, which it uses internally.
     *
     * This is useful when you need to chain actor executions. Similar effect can be achieved
     * by using webhooks, so be sure to review which technique fits your use-case better.
     */
    async waitForFinish(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitSecs: ow_1.default.optional.number,
        }));
        return this._waitForFinish(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().dataset()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    dataset() {
        return new dataset_1.DatasetClient(this._subResourceOptions({
            resourcePath: 'dataset',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().keyValueStore()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    keyValueStore() {
        return new key_value_store_1.KeyValueStoreClient(this._subResourceOptions({
            resourcePath: 'key-value-store',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().requestQueue()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    requestQueue() {
        return new request_queue_1.RequestQueueClient(this._subResourceOptions({
            resourcePath: 'request-queue',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().log()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    log() {
        return new log_1.LogClient(this._subResourceOptions({
            resourcePath: 'log',
        }));
    }
}
exports.RunClient = RunClient;
//# sourceMappingURL=run.js.map