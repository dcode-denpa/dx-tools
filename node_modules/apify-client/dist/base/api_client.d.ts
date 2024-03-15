import { ApifyClient } from '../apify_client';
import { HttpClient } from '../http_client';
/** @private */
export interface ApiClientOptions {
    baseUrl: string;
    resourcePath: string;
    apifyClient: ApifyClient;
    httpClient: HttpClient;
    id?: string;
    params?: Record<string, unknown>;
}
export interface ApiClientOptionsWithOptionalResourcePath extends Omit<ApiClientOptions, 'resourcePath'> {
    resourcePath?: string;
}
export type ApiClientSubResourceOptions = Omit<ApiClientOptions, 'resourcePath'>;
/** @private */
export declare abstract class ApiClient {
    id?: string;
    safeId?: string;
    baseUrl: string;
    resourcePath: string;
    url: string;
    apifyClient: ApifyClient;
    httpClient: HttpClient;
    params?: Record<string, unknown>;
    constructor(options: ApiClientOptions);
    protected _subResourceOptions<T>(moreOptions?: T): BaseOptions & T;
    protected _url(path?: string): string;
    protected _params<T>(endpointParams?: T): Record<string, unknown>;
    protected _toSafeId(id: string): string;
}
export interface BaseOptions {
    baseUrl: string;
    apifyClient: ApifyClient;
    httpClient: HttpClient;
    params: Record<string, unknown>;
}
//# sourceMappingURL=api_client.d.ts.map