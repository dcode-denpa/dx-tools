"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class ScheduleCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
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
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection/get-list-of-schedules
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection/create-schedule
     */
    async create(schedule) {
        (0, ow_1.default)(schedule, ow_1.default.optional.object);
        return this._create(schedule);
    }
}
exports.ScheduleCollectionClient = ScheduleCollectionClient;
//# sourceMappingURL=schedule_collection.js.map