"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const BeaconsFilePersistence_1 = require("../../src/persistence/BeaconsFilePersistence");
const BeaconsPersistenceFixture_1 = require("./BeaconsPersistenceFixture");
suite('BeaconsFilePersistence', () => {
    let persistence;
    let fixture;
    setup((done) => {
        persistence = new BeaconsFilePersistence_1.BeaconsFilePersistence('./data/beacons.test.json');
        persistence.configure(new pip_services_commons_node_1.ConfigParams());
        fixture = new BeaconsPersistenceFixture_1.BeaconsPersistenceFixture(persistence);
        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    teardown((done) => {
        persistence.close(null, done);
    });
    test('CRUD operations', (done) => {
        fixture.testCrudOperations(done);
    });
    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });
});
//# sourceMappingURL=BeaconsFilePersistence.test.js.map