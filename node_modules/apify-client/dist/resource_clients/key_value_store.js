"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueStoreClient = void 0;
const tslib_1 = require("tslib");
const log_1 = tslib_1.__importDefault(require("@apify/log"));
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class KeyValueStoreClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'key-value-stores',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/get-store
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/update-store
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/delete-store
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/key-collection/get-list-of-keys
     */
    async listKeys(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            exclusiveStartKey: ow_1.default.optional.string,
        }));
        const response = await this.httpClient.call({
            url: this._url('keys'),
            method: 'GET',
            params: this._params(options),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Tests whether a record with the given key exists in the key-value store without retrieving its value.
     *
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/get-record
     * @param key The queried record key.
     * @returns `true` if the record exists, `false` if it does not.
     */
    async recordExists(key) {
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'HEAD',
            params: this._params(),
        };
        try {
            await this.httpClient.call(requestOpts);
            return true;
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return false;
    }
    async getRecord(key, options = {}) {
        (0, ow_1.default)(key, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            buffer: ow_1.default.optional.boolean,
            stream: ow_1.default.optional.boolean,
            disableRedirect: ow_1.default.optional.boolean,
        }));
        if (options.stream && !(0, utils_1.isNode)()) {
            throw new Error('The stream option can only be used in Node.js environment.');
        }
        if ('disableRedirect' in options) {
            log_1.default.deprecated('The disableRedirect option for getRecord() is deprecated. '
                + 'It has no effect and will be removed in the following major release.');
        }
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'GET',
            params: this._params(),
        };
        if (options.buffer)
            requestOpts.forceBuffer = true;
        if (options.stream)
            requestOpts.responseType = 'stream';
        try {
            const response = await this.httpClient.call(requestOpts);
            return {
                key,
                value: response.data,
                contentType: response.headers['content-type'],
            };
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * The value in the record can be a stream object (detected by having the `.pipe`
     * and `.on` methods). However, note that in that case following redirects or
     * retrying the request if it fails (for example due to rate limiting) isn't
     * possible. If you want to keep that behavior, you need to collect the whole
     * stream contents into a Buffer and then send the full buffer. See [this
     * StackOverflow answer](https://stackoverflow.com/a/14269536/7292139) for
     * an example how to do that.
     *
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/put-record
     */
    async setRecord(record) {
        (0, ow_1.default)(record, ow_1.default.object.exactShape({
            key: ow_1.default.string,
            value: ow_1.default.any(ow_1.default.null, ow_1.default.string, ow_1.default.number, ow_1.default.object, ow_1.default.boolean),
            contentType: ow_1.default.optional.string.nonEmpty,
        }));
        const { key } = record;
        let { value, contentType } = record;
        const isValueStreamOrBuffer = (0, utils_1.isStream)(value) || (0, utils_1.isBuffer)(value);
        // To allow saving Objects to JSON without providing content type
        if (!contentType) {
            if (isValueStreamOrBuffer)
                contentType = 'application/octet-stream';
            else if (typeof value === 'string')
                contentType = 'text/plain; charset=utf-8';
            else
                contentType = 'application/json; charset=utf-8';
        }
        const isContentTypeJson = /^application\/json/.test(contentType);
        if (isContentTypeJson && !isValueStreamOrBuffer && typeof value !== 'string') {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                const msg = `The record value cannot be stringified to JSON. Please provide other content type.\nCause: ${err.message}`;
                throw new Error(msg);
            }
        }
        const uploadOpts = {
            url: this._url(`records/${key}`),
            method: 'PUT',
            params: this._params(),
            data: value,
            headers: contentType ? { 'content-type': contentType } : undefined,
        };
        await this.httpClient.call(uploadOpts);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/delete-record
     */
    async deleteRecord(key) {
        (0, ow_1.default)(key, ow_1.default.string);
        await this.httpClient.call({
            url: this._url(`records/${key}`),
            method: 'DELETE',
            params: this._params(),
        });
    }
}
exports.KeyValueStoreClient = KeyValueStoreClient;
//# sourceMappingURL=key_value_store.js.map