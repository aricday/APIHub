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
import React, { cloneElement } from 'react';
import { Filter, sanitizeListRestProps, SelectInput, TopToolbar, } from 'react-admin';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { readApiHubPreference } from '../preferences';
import { AccessField, CardGrid, Datagrid, List, ListDisplayButton, ListDisplayProvider, LIST_DISPLAY_CARDS, SortButton, SortMenuItem, TruncatedTextField, useListDisplay, } from '../ui';
import { ApplicationCard } from './ApplicationCard';
const defaultSort = { field: 'uuid', order: 'ASC' };
const listDisplayPreferenceName = 'listDisplay/applications';
export const ApplicationList = props => {
    const initialListDisplay = readApiHubPreference(listDisplayPreferenceName, LIST_DISPLAY_CARDS);
    return (React.createElement(ListDisplayProvider, { initialListDisplay: initialListDisplay, preferenceName: listDisplayPreferenceName },
        React.createElement(List, Object.assign({ actions: React.createElement(ApplicationListActions, null), filter: { $select: 'Name,Uuid,ApiKey,Status,Description' }, filters: React.createElement(ApplicationFilter, null), sort: defaultSort, bulkActionButtons: false, component: ApplicationListComponent }, props),
            React.createElement(ApplicationListDisplay, null))));
};
const ApplicationListComponent = props => React.createElement("div", Object.assign({}, props));
const ApplicationFilter = props => {
    return (React.createElement(Filter, Object.assign({}, props),
        React.createElement(SelectInput, { source: "status", choices: [
                {
                    id: 'Enabled',
                    name: 'resources.applications.status.enabled',
                },
                {
                    id: 'Disabled',
                    name: 'resources.applications.status.disabled',
                },
            ] })));
};
const ApplicationListDisplay = props => {
    const [display] = useListDisplay();
    if (display === LIST_DISPLAY_CARDS) {
        return (React.createElement(CardGrid, Object.assign({}, props),
            React.createElement(ApplicationCard, null)));
    }
    return (React.createElement(Card, null,
        React.createElement(Datagrid, Object.assign({ rowClick: "show" }, props),
            React.createElement(TruncatedTextField, { source: "name" }),
            React.createElement(AccessField, { source: "status", translationKey: "resources.applications.status" }))));
};
const useApplicationListActionsStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
    },
    button: {
        marginLeft: theme.spacing(),
    },
}));
const ApplicationListActions = (_a) => {
    var { className, currentSort, displayedFilters, exporter, filters, filterValues, permanentFilter, resource, showFilter } = _a, props = __rest(_a, ["className", "currentSort", "displayedFilters", "exporter", "filters", "filterValues", "permanentFilter", "resource", "showFilter"]);
    const classes = useApplicationListActionsStyles();
    const [display] = useListDisplay();
    return (React.createElement(TopToolbar, Object.assign({ className: classnames(classes.root, className) }, sanitizeListRestProps(props)),
        filters &&
            cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            }),
        display === LIST_DISPLAY_CARDS ? (React.createElement(ApplicationListSortButton, { resource: resource, currentSort: currentSort })) : null,
        React.createElement(ListDisplayButton, { className: classes.button })));
};
export const ApplicationListSortButton = props => (React.createElement(SortButton, Object.assign({}, props),
    React.createElement(SortMenuItem, { label: "resources.applications.list.sort.name.asc", sort: SortByNameASC }),
    React.createElement(SortMenuItem, { label: "resources.applications.list.sort.name.desc", sort: SortByNameDESC })));
const SortByNameASC = { field: 'name', order: 'ASC' };
const SortByNameDESC = { field: 'name', order: 'DESC' };
//# sourceMappingURL=ApplicationList.js.map