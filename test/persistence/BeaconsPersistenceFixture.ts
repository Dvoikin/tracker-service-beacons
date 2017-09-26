let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { IBeaconsPersistence } from '../../src/persistence/IBeaconPersistence';

let BEACON1: BeaconV1 = {
    id: '1',
    site_id: '1',
    udi: '000001',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
}

let BEACON2: BeaconV1 = {
    id: '2',
    site_id: '2',
    udi: '000002',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
}

let BEACON3: BeaconV1 = {
    id: '3',
    site_id: '3',
    udi: '000003',
    label: 'TestBeacon3',
    center: { type: 'Point', coordinates: [10, 10] },
    radius: 50
}

export class BeaconsPersistenceFixture {
    private _persistaence: IBeaconsPersistence;

    public constructor(persistaence: IBeaconsPersistence) {
        assert.isNotNull(persistaence);
        this._persistaence = persistaence;
    }

    private createBeacons(done) {
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
                })
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
                })
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
                })
            }
        ], done);
    }

    public testCrudOperations(done) {
        let beacon1: BeaconV1;

        async.series([
            (callback) => {
                this.createBeacons(callback);
            },
            (callback) => {
                this._persistaence.getPageByFilter(null, new FilterParams(), new PagingParams(), (err, page) => {
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

    public testGetWithFilter(done) {
        async.series([
            (callback) => {
                this.createBeacons(callback);
            },

            (callback) => {
                this._persistaence.getPageByFilter(null, FilterParams.fromTuples('site_id', '1'), new PagingParams(), (err, page) => {
                    assert.isNull(err);

                    assert.isObject(page);
                    assert.lengthOf(page.data, 1);

                    callback();
                });
            },

            (callback) => {
                this._persistaence.getPageByFilter(null, FilterParams.fromTuples('udi', '000002'), new PagingParams(), (err, page) => {
                    assert.isNull(err);

                    assert.isObject(page);
                    assert.lengthOf(page.data, 1);
                    assert.equal(page.data[0].udi, '000002');

                    callback();
                });
            },

            (callback) => {
                this._persistaence.getPageByFilter(null, FilterParams.fromTuples('udis', '000001,000002,000004'), new PagingParams(), (err, page) => {
                    assert.isNull(err);

                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);

                    callback();
                });
            }
        ], done);
    }
}
