import { AxiosInterceptorManager, AxiosResponse } from 'axios';
import { ApifyRequestConfig, ApifyResponse } from './http_client';
/**
 * This error exists for the quite common situation, where only a partial JSON response is received and
 * an attempt to parse the JSON throws an error. In most cases this can be resolved by retrying the
 * request. We do that by identifying this error in HttpClient.
 *
 * The properties mimic AxiosError for easier integration in HttpClient error handling.
 */
export declare class InvalidResponseBodyError extends Error {
    code: string;
    response: AxiosResponse;
    cause: Error;
    constructor(response: AxiosResponse, cause: Error);
}
export type RequestInterceptorFunction = Parameters<AxiosInterceptorManager<ApifyRequestConfig>['use']>[0];
export type ResponseInterceptorFunction = Parameters<AxiosInterceptorManager<ApifyResponse>['use']>[0];
export declare const requestInterceptors: RequestInterceptorFunction[];
export declare const responseInterceptors: ResponseInterceptorFunction[];
//# sourceMappingURL=interceptors.d.ts.map