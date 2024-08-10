"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class WebhookCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/get-list-of-webhooks
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/create-webhook
     */
    async create(webhook) {
        (0, ow_1.default)(webhook, ow_1.default.optional.object);
        return this._create(webhook);
    }
}
exports.WebhookCollectionClient = WebhookCollectionClient;
//# sourceMappingURL=webhook_collection.js.map