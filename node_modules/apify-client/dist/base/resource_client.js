"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceClient = void 0;
const consts_1 = require("@apify/consts");
const api_client_1 = require("./api_client");
const utils_1 = require("../utils");
/**
 * We need to supply some number for the API,
 * because it would not accept "Infinity".
 * 999999 seconds is more than 10 days.
 */
const MAX_WAIT_FOR_FINISH = 999999;
/**
 * Resource client.
 * @private
 */
class ResourceClient extends api_client_1.ApiClient {
    async _get(options = {}) {
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(options),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    async _update(newFields) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'PUT',
            params: this._params(),
            data: newFields,
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
    async _delete() {
        try {
            await this.httpClient.call({
                url: this._url(),
                method: 'DELETE',
                params: this._params(),
            });
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
    }
    /**
     * This function is used in Build and Run endpoints so it's kept
     * here to stay DRY.
     */
    async _waitForFinish(options = {}) {
        const { waitSecs = MAX_WAIT_FOR_FINISH, } = options;
        const waitMillis = waitSecs * 1000;
        let job;
        const startedAt = Date.now();
        const shouldRepeat = () => {
            const millisSinceStart = Date.now() - startedAt;
            if (millisSinceStart >= waitMillis)
                return false;
            const hasJobEnded = job && consts_1.ACT_JOB_TERMINAL_STATUSES.includes(job.status);
            return !hasJobEnded;
        };
        do {
            const millisSinceStart = Date.now() - startedAt;
            const remainingWaitSeconds = Math.round((waitMillis - millisSinceStart) / 1000);
            const waitForFinish = Math.max(0, remainingWaitSeconds);
            const requestOpts = {
                url: this._url(),
                method: 'GET',
                params: this._params({ waitForFinish }),
            };
            try {
                const response = await this.httpClient.call(requestOpts);
                job = (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
            }
            catch (err) {
                (0, utils_1.catchNotFoundOrThrow)(err);
                job = undefined;
            }
            // It might take some time for database replicas to get up-to-date,
            // so getRun() might return null. Wait a little bit and try it again.
            if (!job)
                await new Promise((resolve) => setTimeout(resolve, 250));
        } while (shouldRepeat());
        if (!job) {
            const constructorName = this.constructor.name;
            const jobName = constructorName.match(/(\w+)Client/)[1].toLowerCase();
            throw new Error(`Waiting for ${jobName} to finish failed. Cannot fetch actor ${jobName} details from the server.`);
        }
        return job;
    }
}
exports.ResourceClient = ResourceClient;
//# sourceMappingURL=resource_client.js.map