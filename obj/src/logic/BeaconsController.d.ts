import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { ConfigParams } from "pip-services-commons-node";
import { IConfigurable } from "pip-services-commons-node";
import { IReferenceable } from "pip-services-commons-node";
import { IReferences } from "pip-services-commons-node";
import { CommandSet } from "pip-services-commons-node";
import { ICommandable } from "pip-services-commons-node";
import { BeaconV1 } from "../data/version1/BeaconV1";
import { IBeaconsController } from "./IBeaconsController";
export declare class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig;
    private _persistence;
    private _dependencyResolver;
    configure(config: ConfigParams): void;
    private _commandSet;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
    calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void;
    createBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    updateBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    deleteBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}
