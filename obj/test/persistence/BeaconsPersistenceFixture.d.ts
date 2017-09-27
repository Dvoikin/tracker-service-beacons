import { IBeaconsPersistence } from '../../src/persistence/IBeaconPersistence';
export declare class BeaconsPersistenceFixture {
    private _persistaence;
    constructor(persistaence: IBeaconsPersistence);
    private createBeacons(done);
    testCrudOperations(done: any): void;
    testGetWithFilter(done: any): void;
}
