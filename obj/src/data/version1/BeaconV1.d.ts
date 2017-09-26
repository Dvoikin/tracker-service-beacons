import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class BeaconV1 implements IStringIdentifiable {
    id: string;
    site_id: string;
    udi: string;
    label?: string;
    center?: any;
    radius?: number;
}
