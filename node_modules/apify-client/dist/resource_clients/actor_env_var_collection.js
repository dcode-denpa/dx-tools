"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorEnvVarCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class ActorEnvVarCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'env-vars',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-collection/get-list-of-environment-variables
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
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-collection/create-environment-variable
     */
    async create(actorEnvVar) {
        (0, ow_1.default)(actorEnvVar, ow_1.default.optional.object);
        return this._create(actorEnvVar);
    }
}
exports.ActorEnvVarCollectionClient = ActorEnvVarCollectionClient;
//# sourceMappingURL=actor_env_var_collection.js.map