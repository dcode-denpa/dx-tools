/// <reference types="node" />
import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import { PaginatedList } from '../utils';
export declare class DatasetClient<Data extends Record<string | number, any> = Record<string | number, unknown>> extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/get-dataset
     */
    get(): Promise<Dataset | undefined>;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/update-dataset
     */
    update(newFields: DatasetClientUpdateOptions): Promise<Dataset>;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/delete-dataset
     */
    delete(): Promise<void>;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items
     */
    listItems(options?: DatasetClientListItemOptions): Promise<PaginatedList<Data>>;
    /**
     * Unlike `listItems` which returns a {@link PaginationList} with an array of individual
     * dataset items, `downloadItems` returns the items serialized to the provided format.
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items
     */
    downloadItems(format: DownloadItemsFormat, options?: DatasetClientDownloadItemsOptions): Promise<Buffer>;
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items
     */
    pushItems(items: Data | Data[] | string | string[]): Promise<void>;
    private _createPaginationList;
}
export interface Dataset {
    id: string;
    name?: string;
    title?: string;
    userId: string;
    createdAt: Date;
    modifiedAt: Date;
    accessedAt: Date;
    itemCount: number;
    cleanItemCount: number;
    actId?: string;
    actRunId?: string;
    stats: DatasetStats;
    fields: string[];
}
export interface DatasetStats {
    readCount?: number;
    writeCount?: number;
    deleteCount?: number;
    storageBytes?: number;
}
export interface DatasetClientUpdateOptions {
    name: string;
    title?: string;
}
export interface DatasetClientListItemOptions {
    clean?: boolean;
    desc?: boolean;
    flatten?: string[];
    fields?: string[];
    omit?: string[];
    limit?: number;
    offset?: number;
    skipEmpty?: boolean;
    skipHidden?: boolean;
    unwind?: string;
    view?: string;
}
export declare enum DownloadItemsFormat {
    JSON = "json",
    JSONL = "jsonl",
    XML = "xml",
    HTML = "html",
    CSV = "csv",
    XLSX = "xlsx",
    RSS = "rss"
}
export interface DatasetClientDownloadItemsOptions extends DatasetClientListItemOptions {
    attachment?: boolean;
    bom?: boolean;
    delimiter?: string;
    skipHeaderRow?: boolean;
    xmlRoot?: string;
    xmlRow?: string;
}
//# sourceMappingURL=dataset.d.ts.map