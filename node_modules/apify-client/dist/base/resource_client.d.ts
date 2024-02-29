import { ACT_JOB_STATUSES } from '@apify/consts';
import { ApiClient } from './api_client';
/**
 * Resource client.
 * @private
 */
export declare class ResourceClient extends ApiClient {
    protected _get<T, R>(options?: T): Promise<R | undefined>;
    protected _update<T, R>(newFields: T): Promise<R>;
    protected _delete(): Promise<void>;
    /**
     * This function is used in Build and Run endpoints so it's kept
     * here to stay DRY.
     */
    protected _waitForFinish<R extends {
        status: typeof ACT_JOB_STATUSES[keyof typeof ACT_JOB_STATUSES];
    }>(options?: WaitForFinishOptions): Promise<R>;
}
export interface WaitForFinishOptions {
    waitSecs?: number;
}
//# sourceMappingURL=resource_client.d.ts.map