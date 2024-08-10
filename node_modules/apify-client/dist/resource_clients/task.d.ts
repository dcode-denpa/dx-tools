import { ACT_JOB_STATUSES } from '@apify/consts';
import { ActorRun, ActorStartOptions } from './actor';
import { RunClient } from './run';
import { RunCollectionClient } from './run_collection';
import { WebhookCollectionClient } from './webhook_collection';
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import { Dictionary } from '../utils';
export declare class TaskClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/get-task
     */
    get(): Promise<Task | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/update-task
     */
    update(newFields: TaskUpdateData): Promise<Task>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/delete-task
     */
    delete(): Promise<void>;
    /**
     * Starts a task and immediately returns the Run object.
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection/run-task
     */
    start(input?: Dictionary, options?: TaskStartOptions): Promise<ActorRun>;
    /**
     * Starts a task and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection/run-task
     */
    call(input?: Dictionary, options?: TaskCallOptions): Promise<ActorRun>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-input-object/get-task-input
     */
    getInput(): Promise<Dictionary | Dictionary[] | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-input-object/update-task-input
     */
    updateInput(newFields: Dictionary | Dictionary[]): Promise<Dictionary | Dictionary[]>;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/last-run-object-and-its-storages
     */
    lastRun(options?: TaskLastRunOptions): RunClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection
     */
    runs(): RunCollectionClient;
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/webhook-collection
     */
    webhooks(): WebhookCollectionClient;
}
export interface Task {
    id: string;
    userId: string;
    actId: string;
    name: string;
    title?: string;
    description?: string;
    username?: string;
    createdAt: Date;
    modifiedAt: Date;
    stats: TaskStats;
    options?: TaskOptions;
    input?: Dictionary | Dictionary[];
}
export interface TaskStats {
    totalRuns: number;
}
export interface TaskOptions {
    build?: string;
    timeoutSecs?: number;
    memoryMbytes?: number;
}
export type TaskUpdateData = Partial<Pick<Task, 'name' | 'title' | 'description' | 'options' | 'input'>>;
export interface TaskLastRunOptions {
    status?: keyof typeof ACT_JOB_STATUSES;
}
export type TaskStartOptions = Omit<ActorStartOptions, 'contentType'>;
export interface TaskCallOptions extends Omit<TaskStartOptions, 'waitForFinish'> {
    waitSecs?: number;
}
//# sourceMappingURL=task.d.ts.map