"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorSourceType = exports.ActorVersionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const actor_env_var_1 = require("./actor_env_var");
const actor_env_var_collection_1 = require("./actor_env_var_collection");
const resource_client_1 = require("../base/resource_client");
class ActorVersionClient extends resource_client_1.ResourceClient {
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
     * https://docs.apify.com/api/v2#/reference/actors/version-object/get-version
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/update-version
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/delete-version
     */
    async delete() {
        return this._delete();
    }
    /**
     * TODO: https://docs.apify.com/api/v2#/reference/actors/env-var-object
     */
    envVar(envVarName) {
        (0, ow_1.default)(envVarName, ow_1.default.string);
        return new actor_env_var_1.ActorEnvVarClient(this._subResourceOptions({
            id: envVarName,
        }));
    }
    /**
     * TODO: https://docs.apify.com/api/v2#/reference/actors/env-var-collection
     * @return {ActorVersionCollectionClient}
     */
    envVars() {
        return new actor_env_var_collection_1.ActorEnvVarCollectionClient(this._subResourceOptions());
    }
}
exports.ActorVersionClient = ActorVersionClient;
var ActorSourceType;
(function (ActorSourceType) {
    ActorSourceType["SourceFiles"] = "SOURCE_FILES";
    ActorSourceType["GitRepo"] = "GIT_REPO";
    ActorSourceType["Tarball"] = "TARBALL";
    ActorSourceType["GitHubGist"] = "GITHUB_GIST";
})(ActorSourceType || (exports.ActorSourceType = ActorSourceType = {}));
//# sourceMappingURL=actor_version.js.map