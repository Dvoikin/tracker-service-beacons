let _ = require('lodash');

import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { IdentifiableMongoDbPersistence } from "pip-services-data-node";

import { BeaconV1 } from "../data/version1/BeaconV1";
import { IBeaconsPersistence } from './IBeaconPersistence';
import { BeaconsMongoDbSchema } from './BeaconsMongoDbSchema';

export class BeaconsMongoDbPersistence extends IdentifiableMongoDbPersistence<BeaconV1, string> implements IBeaconsPersistence {

    constructor() {
        super('beacons', BeaconsMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ label: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({_id: id});
        }
        let udi = filter.getAsNullableString('udi');
        if (udi != null) {
            criteria.push({udi: udi});
        }
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) {
            criteria.push({site_id: siteId});
        }
        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push({label: label});
        }
        let udis = filter.getAsObject('udis');

        if (_.isString(udis))
            udis = udis.split(",");

        if (_.isArray(udis))
            criteria.push({ udi: { $in: udis } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}