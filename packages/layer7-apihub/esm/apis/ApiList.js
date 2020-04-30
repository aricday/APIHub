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
import { DateField, Filter, ReferenceArrayInput, sanitizeListRestProps, SelectArrayInput, SearchInput, SelectInput, TextField, TopToolbar, } from 'react-admin';
import { useTranslate } from 'ra-core';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { AccessField, CardGrid, Datagrid, List, ListDisplayButton, ListDisplayProvider, LIST_DISPLAY_CARDS, MarkdownField, SortButton, SortMenuItem, TruncatedTextField, useListDisplay, } from '../ui';
import { ApiCard } from './ApiCard';
import { VisibilityField } from './VisibilityField';
import { TagsField } from './TagsField';
import { LastUpdateField } from './LastUpdateField';
import { readApiHubPreference } from '../preferences';
const defaultSort = { field: 'createTs', order: 'DESC' };
const listDisplayPreferenceName = 'listDisplay/apis';
export const ApiList = props => {
    const initialListDisplay = readApiHubPreference(listDisplayPreferenceName, LIST_DISPLAY_CARDS);
    return (React.createElement(ListDisplayProvider, { initialListDisplay: initialListDisplay, preferenceName: listDisplayPreferenceName },
        React.createElement(List, Object.assign({ actions: React.createElement(ApiListActions, null), filters: React.createElement(ApiFilter, null), sort: defaultSort, bulkActionButtons: false, component: ApiListComponent }, props),
            React.createElement(ApiListDisplay, null))));
};
const ApiListComponent = props => React.createElement("div", Object.assign({}, props));
const useApiFilterStyles = makeStyles({
    searchInput: {
        minWidth: '300px',
    },
});
const ApiFilter = props => {
    const translate = useTranslate();
    const classes = useApiFilterStyles();
    return (React.createElement(Filter, Object.assign({}, props),
        React.createElement(SearchInput, { source: "q", className: classes.searchInput, alwaysOn: true, placeholder: translate('resources.apis.list.filters.search') }),
        React.createElement(SelectInput, { source: "accessStatus", choices: [
                {
                    id: 'public',
                    name: 'resources.apis.accessStatus.public',
                },
                {
                    id: 'private',
                    name: 'resources.apis.accessStatus.private',
                },
            ] }),
        React.createElement(SelectInput, { source: "portalStatus", choices: [
                {
                    id: 'Enabled',
                    name: 'resources.apis.portalStatus.enabled',
                },
                {
                    id: 'Disabled',
                    name: 'resources.apis.portalStatus.disabled',
                },
                {
                    id: 'Deprecated',
                    name: 'resources.apis.portalStatus.deprecated',
                },
                {
                    id: 'New',
                    name: 'resources.apis.portalStatus.unpublished',
                },
            ] }),
        React.createElement(SelectInput
        // The field is ssgServiceType in the response payload but apiServiceType in filters
        , { 
            // The field is ssgServiceType in the response payload but apiServiceType in filters
            source: "apiServiceType", choices: [
                {
                    id: 'SOAP',
                    name: 'SOAP',
                },
                {
                    id: 'REST',
                    name: 'REST',
                },
            ] }),
        React.createElement(ReferenceArrayInput, { source: "tags", reference: "tags" },
            React.createElement(SelectArrayInput, { optionText: "name" }))));
};
const ApiListDisplay = props => {
    const [display] = useListDisplay();
    if (display === LIST_DISPLAY_CARDS) {
        return (React.createElement(CardGrid, Object.assign({}, props),
            React.createElement(ApiCard, null)));
    }
    return (React.createElement(Card, null,
        React.createElement(Datagrid, Object.assign({ rowClick: "show" }, props),
            React.createElement(TruncatedTextField, { source: "name" }),
            React.createElement(MarkdownField, { source: "description", stripTags: true, truncate: true }),
            React.createElement(TagsField, { source: "tags", sortable: false }),
            React.createElement(DateField, { source: "createTs" }),
            React.createElement(TruncatedTextField, { source: "version", label: "resources.apis.fields.versionShort" }),
            React.createElement(TextField, { source: "ssgServiceType" }),
            React.createElement(VisibilityField, { source: "accessStatus" }),
            React.createElement(LastUpdateField, { source: "modifyTs" }),
            React.createElement(AccessField, { source: "portalStatus", translationKey: "resources.apis.portalStatus" }))));
};
const useApiListActionsStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
    },
    button: {
        marginLeft: theme.spacing(),
    },
}));
const ApiListActions = (_a) => {
    var { className, currentSort, displayedFilters, exporter, filters, filterValues, permanentFilter, resource, showFilter } = _a, props = __rest(_a, ["className", "currentSort", "displayedFilters", "exporter", "filters", "filterValues", "permanentFilter", "resource", "showFilter"]);
    const classes = useApiListActionsStyles();
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
        display === LIST_DISPLAY_CARDS ? (React.createElement(ApiListSortButton, { resource: resource, currentSort: currentSort })) : null,
        React.createElement(ListDisplayButton, { className: classes.button })));
};
export const ApiListSortButton = props => (React.createElement(SortButton, Object.assign({}, props),
    React.createElement(SortMenuItem, { label: "resources.apis.list.sort.name.asc", sort: SortByNameASC }),
    React.createElement(SortMenuItem, { label: "resources.apis.list.sort.name.desc", sort: SortByNameDESC }),
    React.createElement(SortMenuItem, { label: "resources.apis.list.sort.createTs.desc", sort: SortByCreateTsDESC }),
    React.createElement(SortMenuItem, { label: "resources.apis.list.sort.createTs.asc", sort: SortByCreateTsASC }),
    React.createElement(SortMenuItem, { label: "resources.apis.list.sort.modifyTs.desc", sort: SortByModifyTsDESC }),
    React.createElement(SortMenuItem, { label: "resources.apis.list.sort.modifyTs.asc", sort: SortByModifyTsASC })));
const SortByNameASC = { field: 'name', order: 'ASC' };
const SortByNameDESC = { field: 'name', order: 'DESC' };
const SortByCreateTsASC = { field: 'createTs', order: 'ASC' };
const SortByCreateTsDESC = { field: 'createTs', order: 'DESC' };
const SortByModifyTsASC = { field: 'modifyTs', order: 'ASC' };
const SortByModifyTsDESC = { field: 'modifyTs', order: 'DESC' };
//# sourceMappingURL=ApiList.js.map