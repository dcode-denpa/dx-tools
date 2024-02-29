import { ActorStats } from './actor';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class StoreCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2/#/reference/store/store-actors-collection/get-list-of-actors-in-store
     */
    list(options?: StoreCollectionListOptions): Promise<PaginatedList<ActorStoreList>>;
}
export interface PricingInfo {
    pricingModel: string;
}
export interface ActorStoreList {
    id: string;
    name: string;
    username: string;
    title?: string;
    description?: string;
    stats: ActorStats;
    currentPricingInfo: PricingInfo;
    pictureUrl?: string;
    userPictureUrl?: string;
    url: string;
}
export interface StoreCollectionListOptions {
    limit?: number;
    offset?: number;
    search?: string;
    sortBy?: string;
    category?: string;
    username?: string;
    pricingModel?: string;
}
//# sourceMappingURL=store_collection.d.ts.map