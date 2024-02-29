"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookDispatchStatus = exports.WebhookDispatchClient = void 0;
const resource_client_1 = require("../base/resource_client");
class WebhookDispatchClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhook-dispatches',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatch-object/get-webhook-dispatch
     */
    async get() {
        return this._get();
    }
}
exports.WebhookDispatchClient = WebhookDispatchClient;
var WebhookDispatchStatus;
(function (WebhookDispatchStatus) {
    WebhookDispatchStatus["Active"] = "ACTIVE";
    WebhookDispatchStatus["Succeeded"] = "SUCCEEDED";
    WebhookDispatchStatus["Failed"] = "FAILED";
})(WebhookDispatchStatus || (exports.WebhookDispatchStatus = WebhookDispatchStatus = {}));
//# sourceMappingURL=webhook_dispatch.js.map