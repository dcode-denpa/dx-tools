"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQueueCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class RequestQueueCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'request-queues',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/get-list-of-request-queues
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            unnamed: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/create-request-queue
     */
    async getOrCreate(name) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        return this._getOrCreate(name);
    }
}
exports.RequestQueueCollectionClient = RequestQueueCollectionClient;
//# sourceMappingURL=request_queue_collection.js.map