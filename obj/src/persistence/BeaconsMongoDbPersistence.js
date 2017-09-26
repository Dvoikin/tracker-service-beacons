"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const BeaconsMongoDbSchema_1 = require("./BeaconsMongoDbSchema");
class BeaconsMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('beacons', BeaconsMongoDbSchema_1.BeaconsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
            criteria.push({ _id: id });
        }
        let udi = filter.getAsNullableString('udi');
        if (udi != null) {
            criteria.push({ udi: udi });
        }
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) {
            criteria.push({ site_id: siteId });
        }
        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push({ label: label });
        }
        let udis = filter.getAsObject('udis');
        if (_.isString(udis))
            udis = udis.split(",");
        if (_.isArray(udis))
            criteria.push({ udi: { $in: udis } });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.BeaconsMongoDbPersistence = BeaconsMongoDbPersistence;
//# sourceMappingURL=BeaconsMongoDbPersistence.js.map