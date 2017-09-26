import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { IGetter } from "pip-services-data-node";
import { IWriter } from "pip-services-data-node";

import { BeaconV1 } from "../data/version1/BeaconV1";

export interface IBeaconsPersistence extends IGetter<BeaconV1, string>, IWriter<BeaconV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;

    getOneById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;

    create(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;

    update(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;

    deleteById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}