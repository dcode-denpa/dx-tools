import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import { Timezone } from '../timezones';
import { DistributiveOptional } from '../utils';
export declare class ScheduleClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/get-schedule
     */
    get(): Promise<Schedule | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/update-schedule
     */
    update(newFields: ScheduleCreateOrUpdateData): Promise<Schedule>;
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/delete-schedule
     */
    delete(): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-log/get-schedule-log
     */
    getLog(): Promise<string | undefined>;
}
export interface Schedule {
    id: string;
    userId: string;
    name: string;
    title?: string;
    cronExpression: string;
    timezone: Timezone;
    isEnabled: boolean;
    isExclusive: boolean;
    description?: string;
    createdAt: Date;
    modifiedAt: Date;
    nextRunAt: string;
    lastRunAt: string;
    actions: ScheduleAction[];
}
export type ScheduleCreateOrUpdateData = Partial<Pick<Schedule, 'name' | 'title' | 'cronExpression' | 'timezone' | 'isEnabled' | 'isExclusive' | 'description'> & {
    actions: DistributiveOptional<ScheduleAction, 'id'>[];
}>;
export declare enum ScheduleActions {
    RunActor = "RUN_ACTOR",
    RunActorTask = "RUN_ACTOR_TASK"
}
interface BaseScheduleAction<Type extends ScheduleActions> {
    id: string;
    type: Type;
}
export type ScheduleAction = ScheduleActionRunActor | ScheduleActionRunActorTask;
export interface ScheduleActionRunActor extends BaseScheduleAction<ScheduleActions.RunActor> {
    actorId: string;
    runInput?: ScheduledActorRunInput;
    runOptions?: ScheduledActorRunOptions;
}
export interface ScheduledActorRunInput {
    body: string;
    contentType: string;
}
export interface ScheduledActorRunOptions {
    build: string;
    timeoutSecs: number;
    memoryMbytes: number;
}
export interface ScheduleActionRunActorTask extends BaseScheduleAction<ScheduleActions.RunActorTask> {
    actorTaskId: string;
    input?: string;
}
export {};
//# sourceMappingURL=schedule.d.ts.map