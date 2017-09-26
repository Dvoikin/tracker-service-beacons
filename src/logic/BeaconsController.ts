let async = require('async');
let _ = require('lodash');

import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { ConfigParams } from "pip-services-commons-node";
import { IConfigurable } from "pip-services-commons-node";
import { Descriptor } from "pip-services-commons-node";
import { IReferenceable } from "pip-services-commons-node";
import { IReferences } from "pip-services-commons-node";
import { DependencyResolver } from "pip-services-commons-node";
import { IdGenerator } from "pip-services-commons-node";
import { BeaconsCommandSet } from "./BeaconsCommandSet";
import { CommandSet } from "pip-services-commons-node";
import { ICommandable } from "pip-services-commons-node";
import { BeaconV1 } from "../data/version1/BeaconV1";
import { IBeaconsController } from "./IBeaconsController";
import { IBeaconsPersistence } from "../persistence/IBeaconPersistence";

export class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig = ConfigParams.fromTuples(
        'dependencies.persistence', 'tracker-services-beacons:persistence:*:*:1.0'
    );

    private _persistence: IBeaconsPersistence;
    private _dependencyResolver: DependencyResolver = new DependencyResolver(BeaconsController._defaultConfig);
    public configure(config: ConfigParams) {
        this._dependencyResolver.configure(config);
    }
    private _commandSet: BeaconsCommandSet;

    public setReferences(references: IReferences) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IBeaconsPersistence>(
            'persistence'
        )
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new BeaconsCommandSet(this);

        return this._commandSet;
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    public calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void {
        let beacons: BeaconV1[];
        let position: any = null;

        async.series([
            (callback) => {
                this._persistence.getPageByFilter(correlationId, FilterParams.fromTuples('udis', udis, 'site_id', siteId), null, (err, page) => {
                    beacons = page ? page.data : [];

                    callback();
                })
            },
            (callback) => {
                let lat = 0;
                let long = 0;
                let count = 0;

                for (let beacon of beacons) {
                    if (beacon.center && beacon.center.type == 'Point' && _.isArray(beacon.center.coordinates)) {
                        lat += beacon.center.coordinates[1];
                        long += beacon.center.coordinates[0];
                        count++;
                    }
                }

                if (count > 0) {
                    position = {
                        type: 'Point',
                        coordinates: [
                            long / count, lat / count
                        ]
                    };
                }

                callback();
            }
        ], (err) => {
            callback(err, err == null ? position : null);
        });
    }

    public createBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void {
        item.id = item.id || IdGenerator.nextLong();

        this._persistence.create(correlationId, item, callback);
    }

    public updateBeacon(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void {
        this._persistence.update(correlationId, item, callback);
    }
    public deleteBeaconById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void {
        this._persistence.deleteById(correlationId, id, callback);
    }
}