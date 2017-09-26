"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const BeaconsCommandSet_1 = require("./BeaconsCommandSet");
class BeaconsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_3.DependencyResolver(BeaconsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new BeaconsCommandSet_1.BeaconsCommandSet(this);
        return this._commandSet;
    }
    getBeacons(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getBeaconById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    calculatePosition(correlationId, siteId, udis, callback) {
        let beacons;
        let position = null;
        async.series([
            (callback) => {
                this._persistence.getPageByFilter(correlationId, pip_services_commons_node_1.FilterParams.fromTuples('udis', udis, 'site_id', siteId), null, (err, page) => {
                    beacons = page ? page.data : [];
                    callback();
                });
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
    createBeacon(correlationId, item, callback) {
        item.id = item.id || pip_services_commons_node_4.IdGenerator.nextLong();
        this._persistence.create(correlationId, item, callback);
    }
    updateBeacon(correlationId, item, callback) {
        this._persistence.update(correlationId, item, callback);
    }
    deleteBeaconById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
BeaconsController._defaultConfig = pip_services_commons_node_2.ConfigParams.fromTuples('dependencies.persistence', 'tracker-services-beacons:persistence:*:*:1.0');
exports.BeaconsController = BeaconsController;
//# sourceMappingURL=BeaconsController.js.map