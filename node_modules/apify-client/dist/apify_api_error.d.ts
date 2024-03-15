import { AxiosResponse } from 'axios';
/**
 * An `ApifyApiError` is thrown for successful HTTP requests that reach the API,
 * but the API responds with an error response. Typically, those are rate limit
 * errors and internal errors, which are automatically retried, or validation
 * errors, which are thrown immediately, because a correction by the user is
 * needed.
 */
export declare class ApifyApiError extends Error {
    name: string;
    /**
     * The invoked resource client and the method. Known issue: Sometimes it displays
     * as `unknown` because it can't be parsed from a stack trace.
     */
    clientMethod: string;
    /**
     * HTTP status code of the error.
     */
    statusCode: number;
    /**
     * The type of the error, as returned by the API.
     */
    type?: string;
    /**
     * Number of the API call attempt.
     */
    attempt: number;
    /**
     * HTTP method of the API call.
     */
    httpMethod?: string;
    /**
     * Full path of the API endpoint (URL excluding origin).
     */
    path?: string;
    /**
     * Original stack trace of the exception. It is replaced
     * by a more informative stack with API call information.
     */
    originalStack: string;
    /**
     * @hidden
     */
    constructor(response: AxiosResponse, attempt: number);
    private _safelyParsePathFromResponse;
    private _extractClientAndMethodFromStack;
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
    private _createApiStack;
}
//# sourceMappingURL=apify_api_error.d.ts.map