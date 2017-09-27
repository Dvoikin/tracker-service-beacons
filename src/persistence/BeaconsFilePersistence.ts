let _ = require('lodash');

import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { ConfigParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { JsonFilePersister } from "pip-services-data-node";

import { BeaconV1 } from "../data/version1/BeaconV1";
import { BeaconsMemoryPersistence } from './BeaconsMemoryPersistence';

export class BeaconsFilePersistence extends BeaconsMemoryPersistence {

    protected _persister: JsonFilePersister<BeaconV1>;

    constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<BeaconV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }
}