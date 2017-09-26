import { Factory } from "pip-services-commons-node";
import { Descriptor } from "pip-services-commons-node";

import { BeaconsMemoryPersistence } from "../persistence/BeaconsMemoryPersistence";
import { BeaconsFilePersistence } from "../persistence/BeaconsFilePersistence";
import { BeaconsMongoDbPersistence } from "../persistence/BeaconsMongoDbPersistence";
import { BeaconsController } from "../logic/BeaconsController";
import { BeaconsHttpServiceV1 } from "../services/version1/BeaconsHttpServiceV1";

export class BeaconsServiceFactory extends Factory {
    public static MemoryPersistenceDescriptor = new Descriptor('tracker-services-beacons', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('tracker-services-beacons', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('tracker-services-beacons', 'persistence', 'mongodb', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('tracker-services-beacons', 'controller', 'default', '*', '1.0');
    public static HttpServiceDescriptor = new Descriptor('tracker-services-beacons', 'service', 'http', '*', '1.0');

    constructor() {
        super();
        this.registerAsType(BeaconsServiceFactory.MemoryPersistenceDescriptor, BeaconsMemoryPersistence);
        this.registerAsType(BeaconsServiceFactory.MongoDbPersistenceDescriptor, BeaconsMongoDbPersistence);
        this.registerAsType(BeaconsServiceFactory.FilePersistenceDescriptor, BeaconsFilePersistence);
        this.registerAsType(BeaconsServiceFactory.ControllerDescriptor, BeaconsController);
        this.registerAsType(BeaconsServiceFactory.HttpServiceDescriptor, BeaconsHttpServiceV1);
    }
}