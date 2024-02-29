import { Log } from '@apify/log';
import KeepAliveAgent from 'agentkeepalive';
import { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestInterceptorFunction } from './interceptors';
import { Statistics } from './statistics';
export declare class HttpClient {
    stats: Statistics;
    maxRetries: number;
    minDelayBetweenRetriesMillis: number;
    userProvidedRequestInterceptors: RequestInterceptorFunction[];
    logger: Log;
    timeoutMillis: number;
    httpAgent?: KeepAliveAgent;
    httpsAgent?: KeepAliveAgent.HttpsAgent;
    axios: AxiosInstance;
    workflowKey?: string;
    constructor(options: HttpClientOptions);
    call<T = any>(config: ApifyRequestConfig): Promise<ApifyResponse<T>>;
    private _informAboutStreamNoRetry;
    /**
     * Successful responses are returned, errors and unsuccessful
     * status codes are retried. See the following functions for the
     * retrying logic.
     */
    private _createRequestHandler;
    private _isStatusOk;
    /**
     * Handles all unexpected errors that can happen, but are not
     * Apify API typed errors. E.g. network errors, timeouts and so on.
     */
    private _handleRequestError;
    /**
     * Axios calls req.abort() on timeouts so timeout errors will
     * have a code ECONNABORTED.
     */
    private _isTimeoutError;
    /**
     * We don't want to retry every exception thrown from Axios.
     * The common denominator for retryable errors are network issues.
     * @param {Error} err
     * @private
     */
    private _isRetryableError;
    /**
     * When a network connection to our API is interrupted in the middle of streaming
     * a response, the request often does not fail, but simply contains
     * an incomplete response. This can often be fixed by retrying.
     */
    private _isResponseBodyInvalid;
    /**
     * When a network request is attempted by axios and fails,
     * it throws an AxiosError, which will have the request
     * and config (and other) properties.
     */
    private _isNetworkError;
    /**
     * We retry 429 (rate limit) and 500+.
     * For status codes 300-499 (except 429) we do not retry the request,
     * because it's probably caused by invalid url (redirect 3xx) or invalid user input (4xx).
     */
    private _isStatusCodeRetryable;
    private _onRequestRetry;
}
export interface ApifyRequestConfig extends AxiosRequestConfig {
    stringifyFunctions?: boolean;
    forceBuffer?: boolean;
    doNotRetryTimeouts?: boolean;
}
export interface ApifyResponse<T = any> extends AxiosResponse<T> {
    config: ApifyRequestConfig & InternalAxiosRequestConfig;
}
export interface HttpClientOptions {
    apifyClientStats: Statistics;
    maxRetries: number;
    minDelayBetweenRetriesMillis: number;
    requestInterceptors: RequestInterceptorFunction[];
    timeoutSecs: number;
    logger: Log;
    token?: string;
    workflowKey?: string;
}
//# sourceMappingURL=http_client.d.ts.map