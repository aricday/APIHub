"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ra_core_1 = require("ra-core");
const merge_1 = __importDefault(require("lodash/merge"));
const userContexts_1 = require("../dataProvider/userContexts");
exports.useUserContext = redirectTo => {
    const notify = ra_core_1.useNotify();
    const refresh = ra_core_1.useRefresh();
    const redirect = ra_core_1.useRedirect();
    // Pass a fake id because we can only access the current user context
    const { data: userContext } = ra_core_1.useGetOne('userContexts', userContexts_1.CurrentUserId, {
        action: ra_core_1.CRUD_GET_ONE,
    });
    const [updateProfile] = ra_core_1.useUpdate('userContexts', userContexts_1.CurrentUserId);
    const [updateActiveOrganization] = ra_core_1.useMutation({
        type: 'updateActiveOrganization',
        resource: 'userContexts',
    });
    const handleChangeUserProfile = newUserContext => {
        updateProfile({
            payload: {
                id: userContexts_1.CurrentUserId,
                data: merge_1.default(userContext, newUserContext),
            },
        }, {
            action: ra_core_1.CRUD_UPDATE,
            onSuccess: () => {
                notify('resources.userContexts.userDetails.notifications.update_success', 'info');
                if (redirectTo) {
                    redirect(redirectTo);
                }
                refresh();
            },
            onFailure: () => {
                notify('resources.userContexts.userDetails.notifications.update_error', 'warning');
            },
        });
    };
    const handleChangeUserActiveOrganization = newUserContext => {
        updateActiveOrganization({
            payload: {
                id: userContexts_1.CurrentUserId,
                data: merge_1.default(userContext, newUserContext),
            },
        }, {
            action: ra_core_1.CRUD_UPDATE,
            onSuccess: () => {
                notify('resources.userContexts.activeOrgUuid.notifications.update_success', 'info');
                // We should perform a redirection before refreshing the view,
                // because the current view may not be accessible for the new organization.
                if (redirectTo) {
                    redirect(redirectTo);
                }
                refresh();
            },
            onFailure: () => {
                notify('resources.userContexts.activeOrgUuid.notifications.update_error', 'warning');
            },
        });
    };
    return [
        userContext,
        handleChangeUserProfile,
        handleChangeUserActiveOrganization,
    ];
};
//# sourceMappingURL=useUserContext.js.map