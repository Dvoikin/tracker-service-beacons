"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../persistence/BeaconsMemoryPersistence");
const BeaconsFilePersistence_1 = require("../persistence/BeaconsFilePersistence");
const BeaconsMongoDbPersistence_1 = require("../persistence/BeaconsMongoDbPersistence");
const BeaconsController_1 = require("../logic/BeaconsController");
const BeaconsHttpServiceV1_1 = require("../services/version1/BeaconsHttpServiceV1");
class BeaconsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(BeaconsServiceFactory.MemoryPersistenceDescriptor, BeaconsMemoryPersistence_1.BeaconsMemoryPersistence);
        this.registerAsType(BeaconsServiceFactory.MongoDbPersistenceDescriptor, BeaconsMongoDbPersistence_1.BeaconsMongoDbPersistence);
        this.registerAsType(BeaconsServiceFactory.FilePersistenceDescriptor, BeaconsFilePersistence_1.BeaconsFilePersistence);
        this.registerAsType(BeaconsServiceFactory.ControllerDescriptor, BeaconsController_1.BeaconsController);
        this.registerAsType(BeaconsServiceFactory.HttpServiceDescriptor, BeaconsHttpServiceV1_1.BeaconsHttpServiceV1);
    }
}
BeaconsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor('tracker-services-beacons', 'persistence', 'memory', '*', '1.0');
BeaconsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor('tracker-services-beacons', 'persistence', 'file', '*', '1.0');
BeaconsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor('tracker-services-beacons', 'persistence', 'mongodb', '*', '1.0');
BeaconsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor('tracker-services-beacons', 'controller', 'default', '*', '1.0');
BeaconsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor('tracker-services-beacons', 'service', 'http', '*', '1.0');
exports.BeaconsServiceFactory = BeaconsServiceFactory;
//# sourceMappingURL=BeaconsServiceFactory.js.map