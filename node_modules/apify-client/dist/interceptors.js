"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseInterceptors = exports.requestInterceptors = exports.InvalidResponseBodyError = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importStar(require("axios"));
const content_type_1 = tslib_1.__importDefault(require("content-type"));
const body_parser_1 = require("./body_parser");
const utils_1 = require("./utils");
/**
 * This error exists for the quite common situation, where only a partial JSON response is received and
 * an attempt to parse the JSON throws an error. In most cases this can be resolved by retrying the
 * request. We do that by identifying this error in HttpClient.
 *
 * The properties mimic AxiosError for easier integration in HttpClient error handling.
 */
class InvalidResponseBodyError extends Error {
    constructor(response, cause) {
        super(`Response body could not be parsed.\nCause:${cause.message}`);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = this.constructor.name;
        this.code = 'invalid-response-body';
        this.response = response;
        this.cause = cause;
    }
}
exports.InvalidResponseBodyError = InvalidResponseBodyError;
function serializeRequest(config) {
    var _a, _b;
    const [defaultTransform] = axios_1.default.defaults.transformRequest;
    // The function not only serializes data, but it also adds correct headers.
    const data = defaultTransform(config.data, config.headers);
    // Actor inputs can include functions and we don't want to omit those,
    // because it's convenient for users. JSON.stringify removes them.
    // It's a bit inefficient that we serialize the JSON twice, but I feel
    // it's a small price to pay. The axios default transform does a lot
    // of body type checks and we would have to copy all of them to the resource clients.
    if (config.stringifyFunctions) {
        const contentTypeHeader = ((_a = config.headers) === null || _a === void 0 ? void 0 : _a['Content-Type']) || ((_b = config.headers) === null || _b === void 0 ? void 0 : _b['content-type']);
        try {
            const { type } = content_type_1.default.parse(contentTypeHeader);
            if (type === 'application/json' && typeof config.data === 'object') {
                config.data = stringifyWithFunctions(config.data);
            }
            else {
                config.data = data;
            }
        }
        catch {
            config.data = data;
        }
    }
    else {
        config.data = data;
    }
    return config;
}
function ensureHeadersPrototype(config) {
    if (config.headers && !(config.headers instanceof axios_1.AxiosHeaders)) {
        Object.setPrototypeOf(config.headers, axios_1.AxiosHeaders.prototype);
    }
    return config;
}
/**
 * JSON.stringify() that serializes functions to string instead
 * of replacing them with null or removing them.
 */
function stringifyWithFunctions(obj) {
    return JSON.stringify(obj, (_key, value) => {
        return typeof value === 'function' ? value.toString() : value;
    });
}
async function maybeGzipRequest(config) {
    var _a, _b;
    if ((_a = config.headers) === null || _a === void 0 ? void 0 : _a['content-encoding'])
        return config;
    const maybeZippedData = await (0, utils_1.maybeGzipValue)(config.data);
    if (maybeZippedData) {
        (_b = config.headers) !== null && _b !== void 0 ? _b : (config.headers = {});
        config.headers['content-encoding'] = 'gzip';
        config.data = maybeZippedData;
    }
    return config;
}
function parseResponseData(response) {
    if (!response.data // Nothing to do here.
        || response.config.responseType !== 'arraybuffer' // We don't want to parse custom response types.
        || response.config.forceBuffer // Apify custom property to prevent parsing of buffer.
    ) {
        return response;
    }
    const isBufferEmpty = (0, utils_1.isNode)() ? !response.data.length : !response.data.byteLength;
    if (isBufferEmpty) {
        // undefined is better than an empty buffer
        response.data = undefined;
        return response;
    }
    const contentTypeHeader = response.headers['content-type'];
    try {
        response.data = (0, body_parser_1.maybeParseBody)(response.data, contentTypeHeader);
    }
    catch (err) {
        throw new InvalidResponseBodyError(response, err);
    }
    return response;
}
exports.requestInterceptors = [maybeGzipRequest, serializeRequest, ensureHeadersPrototype];
exports.responseInterceptors = [parseResponseData];
//# sourceMappingURL=interceptors.js.map