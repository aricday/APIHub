import { fetchUtils } from 'ra-core';

// Fake id used because we can only access the current user context
export const CurrentUserId = 'layer7@currentUser';

export const userContextsDataProvider = baseUrl => {
    const basePath = `${baseUrl}/userContexts`;

    return {
        getOne: async () => {
            const { json: data } = await fetchUtils.fetchJson(basePath, {
                credentials: 'include',
            });

            if (!data.userContexts || !data.userContexts.length > 0) {
                throw new Error('Invalid user context');
            }

            const userContext = data.userContexts[0];

            return {
                data: { ...userContext, id: CurrentUserId },
            };
        },
        update: async ({ id, data }) => {
            // The update method should only be used to update the user details
            const {
                userDetails: { firstName, lastName, email, username, uuid },
            } = data;

            await fetchUtils.fetchJson(basePath, {
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
                data: {
                    id,
                    ...data,
                },
            };
        },
        updateActiveOrganization: async ({ id, data }) => {
            // The updateActiveOrganization method should only be used to update the user active organization
            await fetchUtils.fetchJson(basePath, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({
                    orgUuid: data.activeOrgUuid,
                }),
            });

            return {
                data: {
                    id,
                    ...data,
                },
            };
        },
    };
};
