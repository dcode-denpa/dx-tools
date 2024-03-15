"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class DatasetCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'datasets',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/get-list-of-datasets
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
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/create-dataset
     */
    async getOrCreate(name, options) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        (0, ow_1.default)(options === null || options === void 0 ? void 0 : options.schema, ow_1.default.optional.object); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
}
exports.DatasetCollectionClient = DatasetCollectionClient;
//# sourceMappingURL=dataset_collection.js.map