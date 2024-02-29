"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadItemsFormat = exports.DatasetClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class DatasetClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'datasets',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/get-dataset
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/update-dataset
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/delete-dataset
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items
     */
    async listItems(options = {}) {
        var _a;
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clean: ow_1.default.optional.boolean,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            skipEmpty: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.optional.string,
            view: ow_1.default.optional.string,
        }));
        const response = await this.httpClient.call({
            url: this._url('items'),
            method: 'GET',
            params: this._params(options),
        });
        return this._createPaginationList(response, (_a = options.desc) !== null && _a !== void 0 ? _a : false);
    }
    /**
     * Unlike `listItems` which returns a {@link PaginationList} with an array of individual
     * dataset items, `downloadItems` returns the items serialized to the provided format.
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items
     */
    async downloadItems(format, options = {}) {
        (0, ow_1.default)(format, ow_1.default.string.oneOf(validItemFormats));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            attachment: ow_1.default.optional.boolean,
            bom: ow_1.default.optional.boolean,
            clean: ow_1.default.optional.boolean,
            delimiter: ow_1.default.optional.string,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            skipEmpty: ow_1.default.optional.boolean,
            skipHeaderRow: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.optional.string,
            view: ow_1.default.optional.string,
            xmlRoot: ow_1.default.optional.string,
            xmlRow: ow_1.default.optional.string,
        }));
        const { data } = await this.httpClient.call({
            url: this._url('items'),
            method: 'GET',
            params: this._params({
                format,
                ...options,
            }),
            forceBuffer: true,
        });
        return (0, utils_1.cast)(data);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items
     */
    async pushItems(items) {
        (0, ow_1.default)(items, ow_1.default.any(ow_1.default.object, ow_1.default.string, ow_1.default.array.ofType(ow_1.default.any(ow_1.default.object, ow_1.default.string))));
        await this.httpClient.call({
            url: this._url('items'),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8',
            },
            data: items,
            params: this._params(),
            doNotRetryTimeouts: true, // see timeout handling in http-client
        });
    }
    _createPaginationList(response, userProvidedDesc) {
        var _a;
        return {
            items: response.data,
            total: Number(response.headers['x-apify-pagination-total']),
            offset: Number(response.headers['x-apify-pagination-offset']),
            count: response.data.length, // because x-apify-pagination-count returns invalid values when hidden/empty items are skipped
            limit: Number(response.headers['x-apify-pagination-limit']), // API returns 999999999999 when no limit is used
            // TODO: Replace this once https://github.com/apify/apify-core/issues/3503 is solved
            desc: JSON.parse((_a = response.headers['x-apify-pagination-desc']) !== null && _a !== void 0 ? _a : userProvidedDesc),
        };
    }
}
exports.DatasetClient = DatasetClient;
var DownloadItemsFormat;
(function (DownloadItemsFormat) {
    DownloadItemsFormat["JSON"] = "json";
    DownloadItemsFormat["JSONL"] = "jsonl";
    DownloadItemsFormat["XML"] = "xml";
    DownloadItemsFormat["HTML"] = "html";
    DownloadItemsFormat["CSV"] = "csv";
    DownloadItemsFormat["XLSX"] = "xlsx";
    DownloadItemsFormat["RSS"] = "rss";
})(DownloadItemsFormat || (exports.DownloadItemsFormat = DownloadItemsFormat = {}));
const validItemFormats = [
    ...new Set(Object.values(DownloadItemsFormat)
        .map((item) => item.toLowerCase())),
];
//# sourceMappingURL=dataset.js.map