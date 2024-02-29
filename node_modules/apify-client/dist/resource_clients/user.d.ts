import { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
export declare class UserClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * Depending on whether ApifyClient was created with a token,
     * the method will either return public or private user data.
     * https://docs.apify.com/api/v2#/reference/users
     */
    get(): Promise<User>;
    /**
     * https://docs.apify.com/api/v2/#/reference/users/monthly-usage
     */
    monthlyUsage(): Promise<MonthlyUsage | undefined>;
    /**
     * https://docs.apify.com/api/v2/#/reference/users/account-and-usage-limits
     */
    limits(): Promise<AccountAndUsageLimits | undefined>;
}
export interface User {
    username: string;
    profile: {
        bio?: string;
        name?: string;
        pictureUrl?: string;
        githubUsername?: string;
        websiteUrl?: string;
        twitterUsername?: string;
    };
    id?: string;
    email?: string;
    proxy?: UserProxy;
    plan?: UserPlan;
}
export interface UserProxy {
    password: string;
    groups: ProxyGroup[];
}
export interface ProxyGroup {
    name: string;
    description: string;
    availableCount: number;
}
export interface UserPlan {
    id: string;
    description: string;
    isEnabled: boolean;
    monthlyBasePriceUsd: number;
    monthlyUsageCreditsUsd: number;
    usageDiscountPercent: number;
    enabledPlatformFeatures: PlatformFeature[];
    maxMonthlyUsageUsd: number;
    maxActorMemoryGbytes: number;
    maxMonthlyActorComputeUnits: number;
    maxMonthlyResidentialProxyGbytes: number;
    maxMonthlyProxySerps: number;
    maxMonthlyExternalDataTransferGbytes: number;
    maxActorCount: number;
    maxActorTaskCount: number;
    dataRetentionDays: number;
    availableProxyGroups: Record<string, number>;
    teamAccountSeatCount: number;
    supportLevel: string;
    availableAddOns: unknown[];
}
export declare enum PlatformFeature {
    Actors = "ACTORS",
    Storage = "STORAGE",
    ProxySERPS = "PROXY_SERPS",
    Scheduler = "SCHEDULER",
    Webhooks = "WEBHOOKS",
    Proxy = "PROXY",
    ProxyExternalAccess = "PROXY_EXTERNAL_ACCESS"
}
export interface MonthlyUsage {
    usageCycle: UsageCycle;
    monthlyServiceUsage: {
        [key: string]: MonthlyServiceUsageData;
    };
    dailyServiceUsages: DailyServiceUsage[];
    totalUsageCreditsUsdBeforeVolumeDiscount: number;
    totalUsageCreditsUsdAfterVolumeDiscount: number;
}
export interface UsageCycle {
    startAt: Date;
    endAt: Date;
}
/** Monthly usage of a single service */
interface MonthlyServiceUsageData {
    quantity: number;
    baseAmountUsd: number;
    baseUnitPriceUsd: number;
    amountAfterVolumeDiscountUsd: number;
    priceTiers: PriceTier[];
}
interface PriceTier {
    quantityAbove: number;
    discountPercent: number;
    tierQuantity: number;
    unitPriceUsd: number;
    priceUsd: number;
}
interface DailyServiceUsage {
    date: Date;
    serviceUsage: {
        [key: string]: DailyServiceUsageData;
    };
    totalUsageCreditsUsd: number;
}
/** Daily usage of a single service */
interface DailyServiceUsageData {
    quantity: number;
    baseAmountUsd: number;
}
export interface AccountAndUsageLimits {
    monthlyUsageCycle: MonthlyUsageCycle;
    limits: Limits;
    current: Current;
}
export interface MonthlyUsageCycle {
    startAt: Date;
    endAt: Date;
}
export interface Limits {
    maxMonthlyUsageUsd: number;
    maxMonthlyActorComputeUnits: number;
    maxMonthlyExternalDataTransferGbytes: number;
    maxMonthlyProxySerps: number;
    maxMonthlyResidentialProxyGbytes: number;
    maxActorMemoryGbytes: number;
    maxActorCount: number;
    maxActorTaskCount: number;
    maxConcurrentActorJobs: number;
    maxTeamAccountSeatCount: number;
    dataRetentionDays: number;
}
export interface Current {
    monthlyUsageUsd: number;
    monthlyActorComputeUnits: number;
    monthlyExternalDataTransferGbytes: number;
    monthlyProxySerps: number;
    monthlyResidentialProxyGbytes: number;
    actorMemoryGbytes: number;
    actorCount: number;
    actorTaskCount: number;
    activeActorJobCount: number;
    teamAccountSeatCount: number;
}
export {};
//# sourceMappingURL=user.d.ts.map