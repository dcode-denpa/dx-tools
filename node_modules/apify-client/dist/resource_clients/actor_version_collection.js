"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorVersionCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class ActorVersionCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'versions',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/get-list-of-versions
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
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/create-version
     */
    async create(actorVersion) {
        (0, ow_1.default)(actorVersion, ow_1.default.optional.object);
        return this._create(actorVersion);
    }
}
exports.ActorVersionCollectionClient = ActorVersionCollectionClient;
//# sourceMappingURL=actor_version_collection.js.map