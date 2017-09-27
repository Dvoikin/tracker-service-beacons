"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../src/logic/BeaconsController");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
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
    site_id: '1',
    udi: '000002',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
suite('BeaconsController', () => {
    let persistence;
    let controller;
    setup((done) => {
        persistence = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistence.configure(new pip_services_commons_node_3.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        let references = pip_services_commons_node_4.References.fromTuples(new pip_services_commons_node_5.Descriptor('tracker-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services_commons_node_5.Descriptor('tracker-services-beacons', 'controller', 'memory', 'default', '1.0'), controller);
        controller.setReferences(references);
        persistence.open(null, done);
    });
    teardown((done) => {
        persistence.close(null, done);
    });
    test('CRUD operations', (done) => {
        let beacon1;
        async.series([
            (callback) => {
                controller.createBeacon(null, BEACON1, (err, beacon) => {
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
                controller.createBeacon(null, BEACON2, (err, beacon) => {
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
                controller.getBeacons(null, new pip_services_commons_node_1.FilterParams(), new pip_services_commons_node_2.PagingParams(), (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);
                    beacon1 = page.data[0];
                    callback();
                });
            },
            (callback) => {
                beacon1.label = 'ABC';
                controller.updateBeacon(null, beacon1, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    assert.equal(beacon.label, 'ABC');
                    callback();
                });
            },
            (callback) => {
                controller.deleteBeaconById(null, beacon1.id, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    callback();
                });
            },
            (callback) => {
                controller.getBeaconById(null, beacon1.id, (err, beacon) => {
                    assert.isNull(err);
                    assert.isNull(beacon || null);
                    callback();
                });
            }
        ], done);
    });
    test('Calculate position', (done) => {
        async.series([
            (callback) => {
                controller.createBeacon(null, BEACON1, (err, beacon) => {
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
                controller.createBeacon(null, BEACON2, (err, beacon) => {
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
                controller.calculatePosition(null, '1', ['000001'], (err, position) => {
                    assert.isNull(err || null);
                    assert.equal(position.coordinates[0], 0);
                    assert.equal(position.coordinates[1], 0);
                    callback();
                });
            },
            (callback) => {
                controller.calculatePosition(null, '1', ['000001', '000002'], (err, position) => {
                    assert.isNull(err || null);
                    assert.equal(position.coordinates[0], 1);
                    assert.equal(position.coordinates[1], 1);
                    callback();
                });
            }
        ], done);
    });
});
//# sourceMappingURL=BeaconsController.test.js.map