import { ActorRun } from './actor';
import { DatasetClient } from './dataset';
import { KeyValueStoreClient } from './key_value_store';
import { LogClient } from './log';
import { RequestQueueClient } from './request_queue';
import { ApiClientOptionsWithOptionalResourcePath } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class RunClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientOptionsWithOptionalResourcePath);
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object/get-run
     */
    get(options?: RunGetOptions): Promise<ActorRun | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/abort-run/abort-run
     */
    abort(options?: RunAbortOptions): Promise<ActorRun>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/delete-run/delete-run
     */
    delete(): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/metamorph-run/metamorph-run
     */
    metamorph(targetActorId: string, input: unknown, options?: RunMetamorphOptions): Promise<ActorRun>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/reboot-run/reboot-run
     */
    reboot(): Promise<ActorRun>;
    update(newFields: RunUpdateOptions): Promise<ActorRun>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/resurrect-run/resurrect-run
     */
    resurrect(options?: RunResurrectOptions): Promise<ActorRun>;
    /**
     * Returns a promise that resolves with the finished Run object when the provided actor run finishes
     * or with the unfinished Run object when the `waitSecs` timeout lapses. The promise is NOT rejected
     * based on run status. You can inspect the `status` property of the Run object to find out its status.
     *
     * The difference between this function and the `waitForFinish` parameter of the `get` method
     * is the fact that this function can wait indefinitely. Its use is preferable to the
     * `waitForFinish` parameter alone, which it uses internally.
     *
     * This is useful when you need to chain actor executions. Similar effect can be achieved
     * by using webhooks, so be sure to review which technique fits your use-case better.
     */
    waitForFinish(options?: RunWaitForFinishOptions): Promise<ActorRun>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().dataset()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    dataset(): DatasetClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().keyValueStore()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    keyValueStore(): KeyValueStoreClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().requestQueue()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    requestQueue(): RequestQueueClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().log()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    log(): LogClient;
}
export interface RunGetOptions {
    waitForFinish?: number;
}
export interface RunAbortOptions {
    gracefully?: boolean;
}
export interface RunMetamorphOptions {
    contentType?: string;
    build?: string;
}
export interface RunUpdateOptions {
    statusMessage?: string;
    isStatusMessageTerminal?: boolean;
}
export interface RunResurrectOptions {
    build?: string;
    memory?: number;
    timeout?: number;
}
export interface RunWaitForFinishOptions {
    /**
     * Maximum time to wait for the run to finish, in seconds.
     * If the limit is reached, the returned promise is resolved to a run object that will have
     * status `READY` or `RUNNING`. If `waitSecs` omitted, the function waits indefinitely.
     */
    waitSecs?: number;
}
//# sourceMappingURL=run.d.ts.map