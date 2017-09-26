import { Descriptor } from "pip-services-commons-node";
import { CommandableHttpService } from "pip-services-net-node";

export class BeaconsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('beacons');
        this._dependencyResolver.put('controller', new Descriptor('tracker-services-beacons', 'controller', 'default', '*', '1.0'));
    }
}