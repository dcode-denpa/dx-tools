"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApifyApiError = void 0;
const body_parser_1 = require("./body_parser");
const utils_1 = require("./utils");
/**
 * Examples of capturing groups for "...at ActorCollectionClient._list (/Users/..."
 * 0: "at ActorCollectionClient._list ("
 * 1: undefined
 * 2: "ActorCollectionClient"
 * 3: undefined
 * 4: "list"
 * @private
 */
const CLIENT_METHOD_REGEX = /at( async)? ([A-Za-z]+(Collection)?Client)\._?([A-Za-z]+) \(/;
/**
 * An `ApifyApiError` is thrown for successful HTTP requests that reach the API,
 * but the API responds with an error response. Typically, those are rate limit
 * errors and internal errors, which are automatically retried, or validation
 * errors, which are thrown immediately, because a correction by the user is
 * needed.
 */
class ApifyApiError extends Error {
    /**
     * @hidden
     */
    constructor(response, attempt) {
        var _a;
        let message;
        let type;
        let responseData = response.data;
        // Some methods (e.g. downloadItems) set up forceBuffer on request response. If this request failed
        // the body buffer needs to parse to get the correct error.
        if ((0, utils_1.isBuffer)(responseData)) {
            try {
                responseData = JSON.parse((0, body_parser_1.isomorphicBufferToString)(response.data, 'utf-8'));
            }
            catch (e) {
                // This can happen. The data in the response body are malformed.
            }
        }
        if (responseData && responseData.error) {
            const { error } = responseData;
            message = error.message;
            type = error.type;
        }
        else if (responseData) {
            let dataString;
            try {
                dataString = JSON.stringify(responseData, null, 2);
            }
            catch (err) {
                dataString = `${responseData}`;
            }
            message = `Unexpected error: ${dataString}`;
        }
        super(message);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The invoked resource client and the method. Known issue: Sometimes it displays
         * as `unknown` because it can't be parsed from a stack trace.
         */
        Object.defineProperty(this, "clientMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * HTTP status code of the error.
         */
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of the error, as returned by the API.
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Number of the API call attempt.
         */
        Object.defineProperty(this, "attempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * HTTP method of the API call.
         */
        Object.defineProperty(this, "httpMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Full path of the API endpoint (URL excluding origin).
         */
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Original stack trace of the exception. It is replaced
         * by a more informative stack with API call information.
         */
        Object.defineProperty(this, "originalStack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = this.constructor.name;
        this.clientMethod = this._extractClientAndMethodFromStack();
        this.statusCode = response.status;
        this.type = type;
        this.attempt = attempt;
        this.httpMethod = (_a = response.config) === null || _a === void 0 ? void 0 : _a.method;
        this.path = this._safelyParsePathFromResponse(response);
        const stack = this.stack;
        this.originalStack = stack.slice(stack.indexOf('\n'));
        this.stack = this._createApiStack();
    }
    _safelyParsePathFromResponse(response) {
        var _a;
        const urlString = (_a = response.config) === null || _a === void 0 ? void 0 : _a.url;
        let url;
        try {
            url = new URL(urlString);
        }
        catch {
            return urlString;
        }
        return url.pathname + url.search;
    }
    _extractClientAndMethodFromStack() {
        const match = this.stack.match(CLIENT_METHOD_REGEX);
        if (match)
            return `${match[2]}.${match[4]}`;
        return 'unknown';
    }
    /**
     * Creates a better looking and more informative stack that will be printed
     * out when API errors are thrown.
     *
     * Example:
     *
     * ApifyApiError: Actor task was not found
     *   clientMethod: TaskClient.start
     *   statusCode: 404
     *   type: record-not-found
     *   attempt: 1
     *   httpMethod: post
     *   path: /v2/actor-tasks/user~my-task/runs
     */
    _createApiStack() {
        const { name, ...props } = this;
        const stack = Object.entries(props)
            .map(([k, v]) => {
            // Rename originalStack to stack in the stack itself.
            // This is for better readability of errors in log.
            if (k === 'originalStack')
                k = 'stack';
            return `  ${k}: ${v}`;
        })
            .join('\n');
        return `${name}: ${this.message}\n${stack}`;
    }
}
exports.ApifyApiError = ApifyApiError;
//# sourceMappingURL=apify_api_error.js.map