"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceCollectionClient = void 0;
const api_client_1 = require("./api_client");
const utils_1 = require("../utils");
/**
 * Resource collection client.
 * @private
 */
class ResourceCollectionClient extends api_client_1.ApiClient {
    /**
     * @private
     */
    async _list(options = {}) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'GET',
            params: this._params(options),
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
    async _create(resource) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'POST',
            params: this._params(),
            data: resource,
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
    async _getOrCreate(name, resource) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'POST',
            params: this._params({ name }),
            data: resource,
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
}
exports.ResourceCollectionClient = ResourceCollectionClient;
//# sourceMappingURL=resource_collection_client.js.map