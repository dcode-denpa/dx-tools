"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistics = void 0;
const tslib_1 = require("tslib");
const ow_1 = tslib_1.__importDefault(require("ow"));
class Statistics {
    constructor() {
        /**
         * Number of Apify client function calls
         */
        Object.defineProperty(this, "calls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        /**
         * Number of Apify API requests
         */
        Object.defineProperty(this, "requests", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        /**
         * Number of times the API returned 429 error. Errors on first attempt are
         * counted at index 0. First retry error counts are on index 1 and so on.
         */
        Object.defineProperty(this, "rateLimitErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addRateLimitError(attempt) {
        (0, ow_1.default)(attempt, ow_1.default.number.greaterThan(0));
        // attempt is never 0,
        // but we don't want index 0 empty
        const index = attempt - 1;
        this._fillBlanksWithZeroes(index);
        this.rateLimitErrors[index]++;
    }
    /**
     * Removes the necessity to pre-initialize array with correct
     * number of zeroes by dynamically filling the empty indexes
     * when necessary.
     */
    _fillBlanksWithZeroes(inclusiveIndex) {
        if (this.rateLimitErrors.length <= inclusiveIndex) {
            for (let k = 0; k <= inclusiveIndex; k++) {
                if (typeof this.rateLimitErrors[k] !== 'number') {
                    this.rateLimitErrors[k] = 0;
                }
            }
        }
    }
}
exports.Statistics = Statistics;
//# sourceMappingURL=statistics.js.map