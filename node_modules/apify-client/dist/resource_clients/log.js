"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogClient = void 0;
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class LogClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'logs',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    async get() {
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Gets the log in a Readable stream format. Only works in Node.js.
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    async stream() {
        const params = {
            stream: true,
        };
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(params),
            responseType: 'stream',
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.LogClient = LogClient;
//# sourceMappingURL=log.js.map