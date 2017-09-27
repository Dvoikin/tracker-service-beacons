"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
let BEACON1 = {
    id: '1',
    site_id: '1',
    udi: '000001',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
};
let BEACON2 = {
    id: '2',
    site_id: '2',
    udi: '000002',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
let BEACON3 = {
    id: '3',
    site_id: '3',
    udi: '000003',
    label: 'TestBeacon3',
    center: { type: 'Point', coordinates: [10, 10] },
    radius: 50
};
class BeaconsPersistenceFixture {
    constructor(persistaence) {
        assert.isNotNull(persistaence);
        this._persistaence = persistaence;
    }
    createBeacons(done) {
        async.series([
            (callback) => {
                this._persistaence.create(null, BEACON1, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON1.udi);
                    assert.equal(beacon.label, BEACON1.label);
                    assert.equal(beacon.site_id, BEACON1.site_id);
                    // assert.equal(beacon.center, BEACON1.center);
                    callback();
                });
            },
            (callback) => {
                this._persistaence.create(null, BEACON2, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    // assert.equal(beacon.center, BEACON2.center);
                    callback();
                });
            },
            (callback) => {
                this._persistaence.create(null, BEACON3, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON3.udi);
                    assert.equal(beacon.label, BEACON3.label);
                    assert.equal(beacon.site_id, BEACON3.site_id);
                    // assert.equal(beacon.center, BEACON3.center);
                    callback();
                });
            }
        ], done);
    }
    testCrudOperations(done) {
        let beacon1;
        async.series([
            (callback) => {
                this.createBeacons(callback);
            },
            (callback) => {
                this._persistaence.getPageByFilter(null, new pip_services_commons_node_1.FilterParams(), new pip_services_commons_node_2.PagingParams(), (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 3);
                    beacon1 = page.data[0];
                    callback();
                });
            },
            (callback) => {
                beacon1.label = 'ABC';
                this._persistaence.update(null, beacon1, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    assert.equal(beacon.label, 'ABC');
                    callback();
                });
            },
            (callback) => {
                this._persistaence.deleteById(null, beacon1.id, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    callback();
                });
            },
            (callback) => {
                this._persistaence.getOneById(null, beacon1.id, (err, beacon) => {
                    assert.isNull(err);
                    assert.isNull(beacon || null);
                    callback();
                });
            }
        ], done);
    }
    testGetWithFilter(done) {
        async.series([
            (callback) => {
                this.createBeacons(callback);
            },
            (callback) => {
                this._persistaence.getPageByFilter(null, pip_services_commons_node_1.FilterParams.fromTuples('site_id', '1'), new pip_services_commons_node_2.PagingParams(), (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 1);
                    callback();
                });
            },
            (callback) => {
                this._persistaence.getPageByFilter(null, pip_services_commons_node_1.FilterParams.fromTuples('udi', '000002'), new pip_services_commons_node_2.PagingParams(), (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 1);
                    assert.equal(page.data[0].udi, '000002');
                    callback();
                });
            },
            (callback) => {
                this._persistaence.getPageByFilter(null, pip_services_commons_node_1.FilterParams.fromTuples('udis', '000001,000002,000004'), new pip_services_commons_node_2.PagingParams(), (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);
                    callback();
                });
            }
        ], done);
    }
}
exports.BeaconsPersistenceFixture = BeaconsPersistenceFixture;
//# sourceMappingURL=BeaconsPersistenceFixture.js.map