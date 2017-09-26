import { IStringIdentifiable } from 'pip-services-commons-node'; 

export class BeaconV1 implements IStringIdentifiable {
    public id: string;
    public site_id: string;
    public udi: string;
    public label?: string;
    public center?: any;
    public radius?: number;
}