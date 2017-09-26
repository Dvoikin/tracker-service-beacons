import { CommandSet } from "pip-services-commons-node";
import { IBeaconsController } from '../logic/IBeaconsController';
export declare class BeaconsCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IBeaconsController);
    private makeGetBeaconsCommand();
    private makeGetBeaconByIdCommand();
    private makeCalculatePositionCommand();
    private makeCreateBeaconCommand();
    private makeUpdateBeaconCommand();
    private makeDeleteBeaconByIdCommand();
}
