import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";

import { BeaconV1 } from "../data/version1/BeaconV1";

export interface IBeaconsController {
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;

    getBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;

    calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void;

    createBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;

    updateBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;

    deleteBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}