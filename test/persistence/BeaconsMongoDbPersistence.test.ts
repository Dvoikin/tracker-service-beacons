let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';
import { BeaconsMongoDbPersistence } from '../../src/persistence/BeaconsMongoDbPersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsMongoDbPersistence', () => {
    let persistence: BeaconsMongoDbPersistence;
    let fixture: BeaconsPersistenceFixture;
    let mongoUri = process.env['MONGO_URI'];
    let mongoHost = process.env['MONGO_HOST'] || 'localhost';
    let mongoPort = process.env['MONGO_PORT'] || '27017';
    let mongoDatabase = process.env['MONGO_DB'] || 'test';

    setup((done) => {
        persistence = new BeaconsMongoDbPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'connection.uri', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase
        ));

        fixture = new BeaconsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            if (err) {
                console.log('err', err);
                done(err);
                return;
            }
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