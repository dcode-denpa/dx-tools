import { ApiClient } from './api_client';
/**
 * Resource collection client.
 * @private
 */
export declare class ResourceCollectionClient extends ApiClient {
    /**
     * @private
     */
    protected _list<T, R>(options?: T): Promise<R>;
    protected _create<D, R>(resource: D): Promise<R>;
    protected _getOrCreate<D, R>(name?: string, resource?: D): Promise<R>;
}
//# sourceMappingURL=resource_collection_client.d.ts.map