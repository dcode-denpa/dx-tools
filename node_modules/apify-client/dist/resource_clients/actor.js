"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorClient = void 0;
const tslib_1 = require("tslib");
const consts_1 = require("@apify/consts");
const ow_1 = tslib_1.__importDefault(require("ow"));
const actor_version_1 = require("./actor_version");
const actor_version_collection_1 = require("./actor_version_collection");
const build_collection_1 = require("./build_collection");
const run_1 = require("./run");
const run_collection_1 = require("./run_collection");
const webhook_collection_1 = require("./webhook_collection");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class ActorClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'acts',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object/get-actor
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object/update-actor
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object/delete-actor
     */
    async delete() {
        return this._delete();
    }
    /**
     * Starts an actor and immediately returns the Run object.
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor
     */
    async start(input, options = {}) {
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            contentType: ow_1.default.optional.string,
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
            // TODO: remove this ts-expect-error once we migrate HttpClient to TS and define Apify
            // extension of Axios configs
            // @ts-expect-error Apify extension
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
     * Starts an actor and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor
     */
    async call(input, options = {}) {
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            contentType: ow_1.default.optional.string,
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
        // setting it up as a nested route under actor API.
        return this.apifyClient.run(id).waitForFinish({ waitSecs });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/build-collection/build-actor
     * @return {Promise<Build>}
     */
    async build(versionNumber, options = {}) {
        (0, ow_1.default)(versionNumber, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            betaPackages: ow_1.default.optional.boolean,
            tag: ow_1.default.optional.string,
            useCache: ow_1.default.optional.boolean,
            waitForFinish: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('builds'),
            method: 'POST',
            params: this._params({
                version: versionNumber,
                ...options,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
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
     * https://docs.apify.com/api/v2#/reference/actors/build-collection
     */
    builds() {
        return new build_collection_1.BuildCollectionClient(this._subResourceOptions({
            resourcePath: 'builds',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/run-collection
     */
    runs() {
        return new run_collection_1.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object
     */
    version(versionNumber) {
        (0, ow_1.default)(versionNumber, ow_1.default.string);
        return new actor_version_1.ActorVersionClient(this._subResourceOptions({
            id: versionNumber,
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection
     * @return {ActorVersionCollectionClient}
     */
    versions() {
        return new actor_version_collection_1.ActorVersionCollectionClient(this._subResourceOptions());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/webhook-collection
     * @return {WebhookCollectionClient}
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._subResourceOptions());
    }
}
exports.ActorClient = ActorClient;
//# sourceMappingURL=actor.js.map