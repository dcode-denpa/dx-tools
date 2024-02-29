export declare class Statistics {
    /**
     * Number of Apify client function calls
     */
    calls: number;
    /**
     * Number of Apify API requests
     */
    requests: number;
    /**
     * Number of times the API returned 429 error. Errors on first attempt are
     * counted at index 0. First retry error counts are on index 1 and so on.
     */
    rateLimitErrors: number[];
    addRateLimitError(attempt: number): void;
    /**
     * Removes the necessity to pre-initialize array with correct
     * number of zeroes by dynamically filling the empty indexes
     * when necessary.
     */
    private _fillBlanksWithZeroes;
}
//# sourceMappingURL=statistics.d.ts.map