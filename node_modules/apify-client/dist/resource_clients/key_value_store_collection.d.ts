import { KeyValueStore } from './key_value_store';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class KeyValueStoreCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection/get-list-of-key-value-stores
     */
    list(options?: KeyValueStoreCollectionClientListOptions): Promise<PaginatedList<KeyValueStoreCollectionListResult>>;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection/create-key-value-store
     */
    getOrCreate(name?: string, options?: KeyValueStoreCollectionClientGetOrCreateOptions): Promise<KeyValueStore>;
}
export interface KeyValueStoreCollectionClientListOptions {
    unnamed?: boolean;
    limit?: number;
    offset?: number;
    desc?: boolean;
}
export interface KeyValueStoreCollectionClientGetOrCreateOptions {
    schema?: Record<string, unknown>;
}
export type KeyValueStoreCollectionListResult = Omit<KeyValueStore, 'stats'> & {
    username?: string;
};
//# sourceMappingURL=key_value_store_collection.d.ts.map