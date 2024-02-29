"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformFeature = exports.UserClient = void 0;
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class UserClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'users',
            ...options,
        });
    }
    /**
     * Depending on whether ApifyClient was created with a token,
     * the method will either return public or private user data.
     * https://docs.apify.com/api/v2#/reference/users
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/users/monthly-usage
     */
    async monthlyUsage() {
        const requestOpts = {
            url: this._url('usage/monthly'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data), 
            // Convert  monthlyUsage.dailyServiceUsages[].date to Date (by default it's ignored by parseDateFields)
            /* shouldParseField = */ (key) => key === 'date'));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/users/account-and-usage-limits
     */
    async limits() {
        const requestOpts = {
            url: this._url('limits'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.UserClient = UserClient;
var PlatformFeature;
(function (PlatformFeature) {
    PlatformFeature["Actors"] = "ACTORS";
    PlatformFeature["Storage"] = "STORAGE";
    PlatformFeature["ProxySERPS"] = "PROXY_SERPS";
    PlatformFeature["Scheduler"] = "SCHEDULER";
    PlatformFeature["Webhooks"] = "WEBHOOKS";
    PlatformFeature["Proxy"] = "PROXY";
    PlatformFeature["ProxyExternalAccess"] = "PROXY_EXTERNAL_ACCESS";
})(PlatformFeature || (exports.PlatformFeature = PlatformFeature = {}));
//# sourceMappingURL=user.js.map