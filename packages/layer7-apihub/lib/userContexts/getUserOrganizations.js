"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
/**
 * Get the organizations details from the user context.
 *
 * @param {object} userContext The user context
 */
exports.getUserOrganizations = userContext => {
    const activeOrgUuid = get_1.default(userContext, 'activeOrgUuid', null);
    const organizations = get_1.default(userContext, 'accessibleOrgs', {});
    const orgsUuids = Object.values(organizations);
    const accessibleOrgs = Object.keys(organizations).reduce((listAccessibleOrgs, organizationName, index) => {
        const org = {
            uuid: orgsUuids[index],
            name: organizationName,
        };
        listAccessibleOrgs.push(org);
        return listAccessibleOrgs;
    }, []);
    const activeOrg = accessibleOrgs.find(org => org.uuid === activeOrgUuid);
    const hasAccessibleOrgs = accessibleOrgs.length > 0;
    return { hasAccessibleOrgs, accessibleOrgs, activeOrg };
};
//# sourceMappingURL=getUserOrganizations.js.map