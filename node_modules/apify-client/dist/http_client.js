"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const consts_1 = require("@apify/consts");
const agentkeepalive_1 = tslib_1.__importDefault(require("agentkeepalive"));
const async_retry_1 = tslib_1.__importDefault(require("async-retry"));
const axios_1 = tslib_1.__importStar(require("axios"));
const apify_api_error_1 = require("./apify_api_error");
const interceptors_1 = require("./interceptors");
const utils_1 = require("./utils");
const { version } = (0, utils_1.getVersionData)();
const RATE_LIMIT_EXCEEDED_STATUS_CODE = 429;
class HttpClient {
    constructor(options) {
        Object.defineProperty(this, "stats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "minDelayBetweenRetriesMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "userProvidedRequestInterceptors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpsAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "axios", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "workflowKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { token } = options;
        this.stats = options.apifyClientStats;
        this.maxRetries = options.maxRetries;
        this.minDelayBetweenRetriesMillis = options.minDelayBetweenRetriesMillis;
        this.userProvidedRequestInterceptors = options.requestInterceptors;
        this.timeoutMillis = options.timeoutSecs * 1000;
        this.logger = options.logger;
        this.workflowKey = options.workflowKey || process.env[consts_1.APIFY_ENV_VARS.WORKFLOW_KEY];
        this._onRequestRetry = this._onRequestRetry.bind(this);
        if ((0, utils_1.isNode)()) {
            // We want to keep sockets alive for better performance.
            // It's important to set the user's timeout also here and not only
            // on the axios instance, because even though this timeout
            // is for inactive sockets, sometimes the platform would take
            // long to process requests and the socket would time-out
            // while waiting for the response.
            const agentOpts = {
                timeout: this.timeoutMillis,
            };
            this.httpAgent = new agentkeepalive_1.default(agentOpts);
            this.httpsAgent = new agentkeepalive_1.default.HttpsAgent(agentOpts);
        }
        this.axios = axios_1.default.create({
            httpAgent: this.httpAgent,
            httpsAgent: this.httpsAgent,
            paramsSerializer: (params) => {
                const formattedParams = Object.entries(params)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => {
                    const updatedValue = typeof value === 'boolean' ? Number(value) : value;
                    return [key, String(updatedValue)];
                });
                return new URLSearchParams(formattedParams).toString();
            },
            validateStatus: null,
            // Using interceptors for this functionality.
            transformRequest: undefined,
            transformResponse: undefined,
            responseType: 'arraybuffer',
            timeout: this.timeoutMillis,
            // maxBodyLength needs to be Infinity, because -1 falls back to a 10 MB default
            // from an axios subdependency - 'follow-redirects'
            maxBodyLength: Infinity,
            // maxContentLength must be -1, because Infinity will cause axios to run super slow
            // thanks to a bug that's now fixed, but not released yet https://github.com/axios/axios/pull/3738
            maxContentLength: -1,
        });
        // Clean all default headers because they only make a mess and their merging is difficult to understand and buggy.
        this.axios.defaults.headers = new axios_1.AxiosHeaders();
        // If workflow key is available, pass it as a header
        if (this.workflowKey) {
            this.axios.defaults.headers['X-Apify-Workflow-Key'] = this.workflowKey;
        }
        if ((0, utils_1.isNode)()) {
            // Works only in Node. Cannot be set in browser
            const isAtHome = !!process.env[consts_1.APIFY_ENV_VARS.IS_AT_HOME];
            const userAgent = `ApifyClient/${version} (${os_1.default.type()}; Node/${process.version}); isAtHome/${isAtHome}`;
            this.axios.defaults.headers['User-Agent'] = userAgent;
        }
        // Attach Authorization header for all requests if token was provided
        if (token) {
            this.axios.defaults.headers.Authorization = `Bearer ${token}`;
        }
        interceptors_1.requestInterceptors.forEach((i) => this.axios.interceptors.request.use(i));
        this.userProvidedRequestInterceptors.forEach((i) => this.axios.interceptors.request.use(i));
        interceptors_1.responseInterceptors.forEach((i) => this.axios.interceptors.response.use(i));
    }
    async call(config) {
        this.stats.calls++;
        const makeRequest = this._createRequestHandler(config);
        return (0, async_retry_1.default)(makeRequest, {
            retries: this.maxRetries,
            minTimeout: this.minDelayBetweenRetriesMillis,
            onRetry: this._onRequestRetry,
        });
    }
    _informAboutStreamNoRetry() {
        this.logger.warningOnce('Request body was a stream - retrying will not work, as part of it was already consumed.');
        this.logger.warningOnce('If you want Apify client to handle retries for you, collect the stream into a buffer before sending it.');
    }
    /**
     * Successful responses are returned, errors and unsuccessful
     * status codes are retried. See the following functions for the
     * retrying logic.
     */
    _createRequestHandler(config) {
        const makeRequest = async (stopTrying, attempt) => {
            this.stats.requests++;
            let response;
            const requestIsStream = (0, utils_1.isStream)(config.data);
            try {
                if (requestIsStream) {
                    // Handling redirects is not possible without buffering - part of the stream has already been sent and can't be recovered
                    // when server sends the redirect. Therefore we need to override this in Axios config to prevent it from buffering the body.
                    // see also axios/axios#1045
                    config = { ...config, maxRedirects: 0 };
                }
                response = await this.axios.request(config);
                if (this._isStatusOk(response.status))
                    return response;
            }
            catch (err) {
                return (0, utils_1.cast)(this._handleRequestError(err, config, stopTrying));
            }
            if (response.status === RATE_LIMIT_EXCEEDED_STATUS_CODE) {
                this.stats.addRateLimitError(attempt);
            }
            const apiError = new apify_api_error_1.ApifyApiError(response, attempt);
            if (this._isStatusCodeRetryable(response.status)) {
                if (requestIsStream) {
                    this._informAboutStreamNoRetry();
                }
                else {
                    // allow a retry
                    throw apiError;
                }
            }
            stopTrying(apiError);
            return response;
        };
        return makeRequest;
    }
    _isStatusOk(statusCode) {
        return statusCode < 300;
    }
    /**
     * Handles all unexpected errors that can happen, but are not
     * Apify API typed errors. E.g. network errors, timeouts and so on.
     */
    _handleRequestError(err, config, stopTrying) {
        if (this._isTimeoutError(err) && config.doNotRetryTimeouts) {
            return stopTrying(err);
        }
        if (this._isRetryableError(err)) {
            if ((0, utils_1.isStream)(config.data)) {
                this._informAboutStreamNoRetry();
            }
            else {
                throw err;
            }
        }
        return stopTrying(err);
    }
    /**
     * Axios calls req.abort() on timeouts so timeout errors will
     * have a code ECONNABORTED.
     */
    _isTimeoutError(err) {
        return err.code === 'ECONNABORTED';
    }
    /**
     * We don't want to retry every exception thrown from Axios.
     * The common denominator for retryable errors are network issues.
     * @param {Error} err
     * @private
     */
    _isRetryableError(err) {
        return this._isNetworkError(err) || this._isResponseBodyInvalid(err);
    }
    /**
     * When a network connection to our API is interrupted in the middle of streaming
     * a response, the request often does not fail, but simply contains
     * an incomplete response. This can often be fixed by retrying.
     */
    _isResponseBodyInvalid(err) {
        return err instanceof interceptors_1.InvalidResponseBodyError;
    }
    /**
     * When a network request is attempted by axios and fails,
     * it throws an AxiosError, which will have the request
     * and config (and other) properties.
     */
    _isNetworkError(err) {
        const hasRequest = err.request && typeof err.request === 'object';
        const hasConfig = err.config && typeof err.config === 'object';
        return hasRequest && hasConfig;
    }
    /**
     * We retry 429 (rate limit) and 500+.
     * For status codes 300-499 (except 429) we do not retry the request,
     * because it's probably caused by invalid url (redirect 3xx) or invalid user input (4xx).
     */
    _isStatusCodeRetryable(statusCode) {
        const isRateLimitError = statusCode === RATE_LIMIT_EXCEEDED_STATUS_CODE;
        const isInternalError = statusCode >= 500;
        return isRateLimitError || isInternalError;
    }
    _onRequestRetry(error, attempt) {
        if (attempt === Math.round(this.maxRetries / 2)) {
            this.logger.warning(`API request failed ${attempt} times. Max attempts: ${this.maxRetries + 1}.\nCause:${error.stack}`);
        }
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http_client.js.map