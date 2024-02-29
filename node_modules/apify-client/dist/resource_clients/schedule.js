"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleActions = exports.ScheduleClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
class ScheduleClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'schedules',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/get-schedule
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/update-schedule
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/delete-schedule
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-log/get-schedule-log
     */
    async getLog() {
        const requestOpts = {
            url: this._url('log'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.ScheduleClient = ScheduleClient;
var ScheduleActions;
(function (ScheduleActions) {
    ScheduleActions["RunActor"] = "RUN_ACTOR";
    ScheduleActions["RunActorTask"] = "RUN_ACTOR_TASK";
})(ScheduleActions || (exports.ScheduleActions = ScheduleActions = {}));
//# sourceMappingURL=schedule.js.map