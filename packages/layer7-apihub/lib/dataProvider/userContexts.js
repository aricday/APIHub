"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ra_core_1 = require("ra-core");
// Fake id used because we can only access the current user context
exports.CurrentUserId = 'layer7@currentUser';
exports.userContextsDataProvider = baseUrl => {
    const basePath = `${baseUrl}/userContexts`;
    return {
        getOne: async () => {
            const { json: data } = await ra_core_1.fetchUtils.fetchJson(basePath, {
                credentials: 'include',
            });
            if (!data.userContexts || !data.userContexts.length > 0) {
                throw new Error('Invalid user context');
            }
            const userContext = data.userContexts[0];
            return {
                data: Object.assign(Object.assign({}, userContext), { id: exports.CurrentUserId }),
            };
        },
        update: async ({ id, data }) => {
            // The update method should only be used to update the user details
            const { userDetails: { firstName, lastName, email, username, uuid }, } = data;
            await ra_core_1.fetchUtils.fetchJson(basePath, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    username,
                    uuid,
                }),
            });
            return {
                data: Object.assign({ id }, data),
            };
        },
        updateActiveOrganization: async ({ id, data }) => {
            // The updateActiveOrganization method should only be used to update the user active organization
            await ra_core_1.fetchUtils.fetchJson(basePath, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({
                    orgUuid: data.activeOrgUuid,
                }),
            });
            return {
                data: Object.assign({ id }, data),
            };
        },
    };
};
//# sourceMappingURL=userContexts.js.map