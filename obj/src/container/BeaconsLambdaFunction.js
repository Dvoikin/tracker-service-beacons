"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const BeaconsServiceFactory_1 = require("../build/BeaconsServiceFactory");
class BeaconsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super('beacons', 'Beacons positioning function');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('tracker-services-beacons', 'controller', 'default', '*', '1.0'));
        this._factories.add(new BeaconsServiceFactory_1.BeaconsServiceFactory());
    }
    getReferences() {
        return this._references;
    }
}
exports.BeaconsLambdaFunction = BeaconsLambdaFunction;
exports.handler = new BeaconsLambdaFunction().getHandler();
//# sourceMappingURL=BeaconsLambdaFunction.js.map