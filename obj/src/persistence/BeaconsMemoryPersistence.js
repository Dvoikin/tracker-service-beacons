"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
class BeaconsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
        };
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.label, search))
            return true;
        return false;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.BeaconsMemoryPersistence = BeaconsMemoryPersistence;
//# sourceMappingURL=BeaconsMemoryPersistence.js.map