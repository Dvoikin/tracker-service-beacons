let _ = require('lodash');

import { FilterParams } from "pip-services-commons-node";
import { PagingParams } from "pip-services-commons-node";
import { DataPage } from "pip-services-commons-node";
import { IdentifiableMemoryPersistence } from "pip-services-data-node";

import { BeaconV1 } from "../data/version1/BeaconV1";
import { IBeaconsPersistence } from './IBeaconPersistence';

export class BeaconsMemoryPersistence extends IdentifiableMemoryPersistence<BeaconV1, string> implements IBeaconsPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let search = filter.getAsNullableString('search');
        let udi = filter.getAsNullableString('udi');
        let siteId = filter.getAsNullableString('site_id');
        let label = filter.getAsNullableString('label');
        let udis = filter.getAsObject('udis');

        if (_.isString(udis))
            udis = udis.split(",");

        if (!_.isArray(udis))
            udis = null;

        return (item) => {
            if (udi && item.udi != udi)
                return false;
            if (siteId && item.site_id != siteId)
                return false;
            if (udis && _.indexOf(udis, item.udi) < 0)
                return false;
            if (label && item.label != label)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;

            return true;
        }
    }

    private matchString(value: string, search: string) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    } 

    private matchSearch(item: BeaconV1, search: string) {
        search = search.toLowerCase();
        if (this.matchString(item.label, search))
            return true;
        return false;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}