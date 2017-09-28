import { IReferences } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from "pip-services-aws-node";
export declare class BeaconsLambdaFunction extends CommandableLambdaFunction {
    constructor();
    getReferences(): IReferences;
}
export declare const handler: (event: any, context: any) => void;
