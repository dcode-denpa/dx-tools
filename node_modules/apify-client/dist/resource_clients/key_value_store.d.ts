/// <reference types="node" />
/// <reference types="node" />
import type { Readable } from 'node:stream';
import { JsonValue } from 'type-fest';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class KeyValueStoreClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/get-store
     */
    get(): Promise<KeyValueStore | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/update-store
     */
    update(newFields: KeyValueClientUpdateOptions): Promise<KeyValueStore>;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/delete-store
     */
    delete(): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/key-collection/get-list-of-keys
     */
    listKeys(options?: KeyValueClientListKeysOptions): Promise<KeyValueClientListKeysResult>;
    /**
     * Tests whether a record with the given key exists in the key-value store without retrieving its value.
     *
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/get-record
     * @param key The queried record key.
     * @returns `true` if the record exists, `false` if it does not.
     */
    recordExists(key: string): Promise<boolean>;
    /**
     * You can use the `buffer` option to get the value in a Buffer (Node.js)
     * or ArrayBuffer (browser) format. In Node.js (not in browser) you can also
     * use the `stream` option to get a Readable stream.
     *
     * When the record does not exist, the function resolves to `undefined`. It does
     * NOT resolve to a `KeyValueStore` record with an `undefined` value.
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/get-record
     */
    getRecord(key: string): Promise<KeyValueStoreRecord<JsonValue> | undefined>;
    getRecord<Options extends KeyValueClientGetRecordOptions = KeyValueClientGetRecordOptions>(key: string, options: Options): Promise<KeyValueStoreRecord<ReturnTypeFromOptions<Options>> | undefined>;
    /**
     * The value in the record can be a stream object (detected by having the `.pipe`
     * and `.on` methods). However, note that in that case following redirects or
     * retrying the request if it fails (for example due to rate limiting) isn't
     * possible. If you want to keep that behavior, you need to collect the whole
     * stream contents into a Buffer and then send the full buffer. See [this
     * StackOverflow answer](https://stackoverflow.com/a/14269536/7292139) for
     * an example how to do that.
     *
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/put-record
     */
    setRecord(record: KeyValueStoreRecord<JsonValue>): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/delete-record
     */
    deleteRecord(key: string): Promise<void>;
}
export interface KeyValueStore {
    id: string;
    name?: string;
    title?: string;
    userId: string;
    createdAt: Date;
    modifiedAt: Date;
    accessedAt: Date;
    actId?: string;
    actRunId?: string;
    stats?: KeyValueStoreStats;
}
export interface KeyValueStoreStats {
    readCount?: number;
    writeCount?: number;
    deleteCount?: number;
    listCount?: number;
    storageBytes?: number;
}
export interface KeyValueClientUpdateOptions {
    name: string;
    title?: string;
}
export interface KeyValueClientListKeysOptions {
    limit?: number;
    exclusiveStartKey?: string;
}
export interface KeyValueClientListKeysResult {
    count: number;
    limit: number;
    exclusiveStartKey: string;
    isTruncated: boolean;
    nextExclusiveStartKey: string;
    items: KeyValueListItem[];
}
export interface KeyValueListItem {
    key: string;
    size: number;
}
export interface KeyValueClientGetRecordOptions {
    buffer?: boolean;
    stream?: boolean;
}
export interface KeyValueStoreRecord<T> {
    key: string;
    value: T;
    contentType?: string;
}
export type ReturnTypeFromOptions<Options extends KeyValueClientGetRecordOptions> = Options['stream'] extends true ? Readable : Options['buffer'] extends true ? Buffer : JsonValue;
//# sourceMappingURL=key_value_store.d.ts.map