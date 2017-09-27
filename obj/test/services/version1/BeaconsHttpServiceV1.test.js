"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../../src/logic/BeaconsController");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const BeaconsHttpServiceV1_1 = require("../../../src/services/version1/BeaconsHttpServiceV1");
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
    let service;
    let rest;
    suiteSetup((done) => {
        persistence = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistence.configure(new pip_services_commons_node_1.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        service = new BeaconsHttpServiceV1_1.BeaconsHttpServiceV1();
        service.configure(pip_services_commons_node_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.host', 'localhost', 'connection.post', 3000));
        let references = pip_services_commons_node_2.References.fromTuples(new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'services', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        service.open(null, done);
    });
    suiteTeardown((done) => {
        service.close(null, done);
    });
    setup((done) => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        persistence.clear(null, done);
    });
    test('CRUD operations', (done) => {
        let beacon1;
        async.series([
            (callback) => {
                rest.post('/beacons/create_beacon', { beacon: BEACON1 }, (err, req, res, beacon) => {
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
                rest.post('/beacons/create_beacon', { beacon: BEACON2 }, (err, req, res, beacon) => {
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
                rest.post('/beacons/get_beacons', {}, (err, req, res, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);
                    beacon1 = page.data[0];
                    callback();
                });
            },
            (callback) => {
                beacon1.label = 'ABC';
                rest.post('/beacons/update_beacon', { beacon: beacon1 }, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    assert.equal(beacon.label, 'ABC');
                    callback();
                });
            },
            (callback) => {
                rest.post('/beacons/delete_beacon_by_id', { beacon_id: beacon1.id }, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    callback();
                });
            },
            (callback) => {
                rest.post('/beacons/get_beacon_by_id', { beacon_id: beacon1.id }, (err, req, res, beacon) => {
                    assert.isNull(err);
                    //assert.isNull(beacon || null);
                    callback();
                });
            }
        ], done);
    });
    test('Calculate position', (done) => {
        async.series([
            (callback) => {
                rest.post('/beacons/create_beacon', { beacon: BEACON1 }, (err, req, res, beacon) => {
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
                rest.post('/beacons/create_beacon', { beacon: BEACON2 }, (err, req, res, beacon) => {
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
                rest.post('/beacons/calculate_position', { site_id: '1', udis: ['000001'] }, (err, req, res, position) => {
                    assert.isNull(err);
                    assert.equal(position.coordinates[0], 0);
                    assert.equal(position.coordinates[1], 0);
                    callback();
                });
            },
            (callback) => {
                rest.post('/beacons/calculate_position', { site_id: '1', udis: ['000001', '000002'] }, (err, req, res, position) => {
                    assert.isNull(err);
                    assert.equal(position.coordinates[0], 1);
                    assert.equal(position.coordinates[1], 1);
                    callback();
                });
            }
        ], done);
    });
});
//# sourceMappingURL=BeaconsHttpServiceV1.test.js.map