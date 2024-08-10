"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class StoreCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'store',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/store/store-actors-collection/get-list-of-actors-in-store
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            search: ow_1.default.optional.string,
            sortBy: ow_1.default.optional.string,
            category: ow_1.default.optional.string,
            username: ow_1.default.optional.string,
            pricingModel: ow_1.default.optional.string,
        }));
        return this._list(options);
    }
}
exports.StoreCollectionClient = StoreCollectionClient;
//# sourceMappingURL=store_collection.js.map