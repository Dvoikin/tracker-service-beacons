import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { IdentifiableMongoDbPersistence } from "pip-services-data-node";
import { BeaconV1 } from "../data/version1/BeaconV1";
import { IBeaconsPersistence } from './IBeaconPersistence';
export declare class BeaconsMongoDbPersistence extends IdentifiableMongoDbPersistence<BeaconV1, string> implements IBeaconsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
}
