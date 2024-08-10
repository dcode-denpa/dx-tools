"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const log_1 = require("./log");
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class BuildClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-builds',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-object/get-build
     */
    async get(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitForFinish: ow_1.default.optional.number,
        }));
        return this._get(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/abort-build/abort-build
     */
    async abort() {
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params(),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/delete-build/delete-build
     */
    async delete() {
        return this._delete();
    }
    /**
     * Returns a promise that resolves with the finished Build object when the provided actor build finishes
     * or with the unfinished Build object when the `waitSecs` timeout lapses. The promise is NOT rejected
     * based on run status. You can inspect the `status` property of the Build object to find out its status.
     *
     * The difference between this function and the `waitForFinish` parameter of the `get` method
     * is the fact that this function can wait indefinitely. Its use is preferable to the
     * `waitForFinish` parameter alone, which it uses internally.
     *
     * This is useful when you need to immediately start a run after a build finishes.
     */
    async waitForFinish(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitSecs: ow_1.default.optional.number,
        }));
        return this._waitForFinish(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-log
     */
    log() {
        return new log_1.LogClient(this._subResourceOptions({
            resourcePath: 'log',
        }));
    }
}
exports.BuildClient = BuildClient;
//# sourceMappingURL=build.js.map