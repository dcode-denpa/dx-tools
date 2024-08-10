"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class BuildCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-builds',
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/build-collection/get-list-of-builds
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
}
exports.BuildCollectionClient = BuildCollectionClient;
//# sourceMappingURL=build_collection.js.map