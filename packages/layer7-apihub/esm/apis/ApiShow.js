var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { TabbedShowLayout, Tab, useGetOne, useQuery, CRUD_GET_ONE, } from 'react-admin';
import { useTranslate } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import { Show } from '../ui';
import { CurrentUserId } from '../dataProvider/userContexts';
import { isPublisher } from '../userContexts';
import { Overview } from './Overview';
import { Documentation } from './Documentation';
import { Specs } from './Specs';
const ApiTitle = ({ record }) => (record ? record.name : '');
const useTabStyles = makeStyles(theme => ({
    root: {
        textTransform: 'capitalize',
    },
    selected: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
    },
}));
export const ApiShow = (_a) => {
    var { id } = _a, rest = __rest(_a, ["id"]);
    const { data: userContexts } = useGetOne('userContexts', CurrentUserId, {
        action: CRUD_GET_ONE,
    });
    const { data: apisPermissions } = useQuery({
        type: 'getPermissions',
        resource: 'apis',
        payload: { id },
    });
    return (React.createElement(Show, Object.assign({ title: React.createElement(ApiTitle, null), id: id }, rest),
        React.createElement(ApiShowTabs, { userIsPublisher: isPublisher(userContexts), userCanEdit: get(apisPermissions, 'canEdit', false), userCanDelete: get(apisPermissions, 'canEdit', false) })));
};
export const isSoapApi = record => {
    // The API type is defined as ssgServiceType in the API list page,
    // but as apiServiceType in the API show page.
    // The react-admin engine first renders the API show page with the data of the API list page
    // in order to improve the user experience.
    // So we need to test both names to avoid a visual glitch when rendering the Tabs.
    const type = get(record, 'apiServiceType', null) ||
        get(record, 'ssgServiceType', null);
    return type && type.toLowerCase() === 'soap';
};
const ApiShowTabs = props => {
    const translate = useTranslate();
    const classes = useTabStyles(props);
    const { userIsPublisher, userCanEdit, userCanDelete } = props, rest = __rest(props, ["userIsPublisher", "userCanEdit", "userCanDelete"]);
    const showSpecs = !isSoapApi(props.record);
    return (React.createElement(TabbedShowLayout, Object.assign({}, rest),
        React.createElement(Tab, { label: translate('resources.apis.overview.title'), classes: classes },
            React.createElement(Overview, { userIsPublisher: userIsPublisher })),
        showSpecs && (React.createElement(Tab, { label: translate('resources.apis.specification.title'), path: "spec", classes: classes },
            React.createElement(Specs, null))),
        React.createElement(Tab, { label: translate('resources.apis.documentation.title'), path: "doc", classes: classes },
            React.createElement(Documentation, { userCanEdit: userCanEdit, userCanDelete: userCanDelete }))));
};
//# sourceMappingURL=ApiShow.js.map