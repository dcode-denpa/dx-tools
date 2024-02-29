import { Actor, ActorDefaultRunOptions, ActorExampleRunInput } from './actor';
import { ActorVersion } from './actor_version';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import { PaginatedList } from '../utils';
export declare class ActorCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection/get-list-of-actors
     */
    list(options?: ActorCollectionListOptions): Promise<ActorCollectionListResult>;
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection/create-actor
     */
    create(actor: ActorCollectionCreateOptions): Promise<Actor>;
}
export interface ActorCollectionListOptions {
    my?: boolean;
    limit?: number;
    offset?: number;
    desc?: boolean;
}
export interface ActorCollectionListItem {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    username: string;
}
export type ActorCollectionListResult = PaginatedList<ActorCollectionListItem>;
export interface ActorCollectionCreateOptions {
    categories?: string[];
    defaultRunOptions?: ActorDefaultRunOptions;
    description?: string;
    exampleRunInput?: ActorExampleRunInput;
    isDeprecated?: boolean;
    isPublic?: boolean;
    name?: string;
    restartOnError?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    title?: string;
    versions?: ActorVersion[];
}
//# sourceMappingURL=actor_collection.d.ts.map