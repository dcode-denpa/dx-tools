"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCollectionClient = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
const resource_collection_client_1 = require("../base/resource_collection_client");
class TaskCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-tasks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection/get-list-of-tasks
     * @param {object} [options]
     * @param {number} [options.limit]
     * @param {number} [options.offset]
     * @param {boolean} [options.desc]
     * @return {Promise<PaginationList>}
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
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection/create-task
     */
    async create(task) {
        (0, ow_1.default)(task, ow_1.default.object);
        return this._create(task);
    }
}
exports.TaskCollectionClient = TaskCollectionClient;
//# sourceMappingURL=task_collection.js.map