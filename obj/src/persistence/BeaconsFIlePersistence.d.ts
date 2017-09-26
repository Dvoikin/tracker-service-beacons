import { ConfigParams } from "pip-services-commons-node";
import { JsonFilePersister } from "pip-services-data-node";
import { BeaconV1 } from "../data/version1/BeaconV1";
import { BeaconsMemoryPersistence } from './BeaconsMemoryPersistence';
export declare class BeaconsFilePersistence extends BeaconsMemoryPersistence {
    protected _persister: JsonFilePersister<BeaconV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
