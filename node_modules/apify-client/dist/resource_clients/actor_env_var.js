"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorEnvVarClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
class ActorEnvVarClient extends resource_client_1.ResourceClient {
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
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/get-environment-variable
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/update-environment-variable
     */
    async update(actorEnvVar) {
        (0, ow_1.default)(actorEnvVar, ow_1.default.object);
        return this._update(actorEnvVar);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/delete-environment-variable
     */
    async delete() {
        return this._delete();
    }
}
exports.ActorEnvVarClient = ActorEnvVarClient;
//# sourceMappingURL=actor_env_var.js.map