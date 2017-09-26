import { Descriptor } from "pip-services-commons-node";
import { IReferences } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from "pip-services-aws-node";
import { BeaconsServiceFactory } from '../build/BeaconsServiceFactory';

export class BeaconsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super('beacons', 'Beacons positioning function');
        this._dependencyResolver.put('controller', new Descriptor('tracker-services-beacons', 'controller', 'default', '*', '1.0'));
        this._factories.add(new BeaconsServiceFactory());
    }

    public getReferences(): IReferences {
        return this._references;
    }
}

export const handler = new BeaconsLambdaFunction().getHandler();