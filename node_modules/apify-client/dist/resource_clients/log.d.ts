/// <reference types="node" />
import type { Readable } from 'node:stream';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class LogClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    get(): Promise<string | undefined>;
    /**
     * Gets the log in a Readable stream format. Only works in Node.js.
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    stream(): Promise<Readable | undefined>;
}
//# sourceMappingURL=log.d.ts.map