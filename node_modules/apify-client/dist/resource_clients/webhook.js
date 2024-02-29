"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const webhook_dispatch_collection_1 = require("./webhook_dispatch_collection");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class WebhookClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhooks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object/get-webhook
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object/update-webhook
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object/delete-webhook
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-test/test-webhook
     */
    async test() {
        const request = {
            url: this._url('test'),
            method: 'POST',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(request);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/dispatches-collection
     */
    dispatches() {
        return new webhook_dispatch_collection_1.WebhookDispatchCollectionClient(this._subResourceOptions({
            resourcePath: 'dispatches',
        }));
    }
}
exports.WebhookClient = WebhookClient;
//# sourceMappingURL=webhook.js.map