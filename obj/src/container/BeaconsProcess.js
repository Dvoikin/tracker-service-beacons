"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const BeaconsServiceFactory_1 = require("../build/BeaconsServiceFactory");
class BeaconsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super('beacons', 'description');
        this._factories.add(new BeaconsServiceFactory_1.BeaconsServiceFactory());
    }
}
exports.BeaconsProcess = BeaconsProcess;
//# sourceMappingURL=BeaconsProcess.js.map