"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCollectionClient = void 0;
const tslib_1 = require("tslib");
const consts_1 = require("@apify/consts");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class RunCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'runs',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/get-list-of-runs
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
            status: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACT_JOB_STATUSES)),
        }));
        return this._list(options);
    }
}
exports.RunCollectionClient = RunCollectionClient;
//# sourceMappingURL=run_collection.js.map