"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const ui_1 = require("../ui");
const ApiCard_1 = require("./ApiCard");
const VisibilityField_1 = require("./VisibilityField");
const TagsField_1 = require("./TagsField");
const LastUpdateField_1 = require("./LastUpdateField");
const preferences_1 = require("../preferences");
const defaultSort = { field: 'createTs', order: 'DESC' };
const listDisplayPreferenceName = 'listDisplay/apis';
exports.ApiList = props => {
    const initialListDisplay = preferences_1.readApiHubPreference(listDisplayPreferenceName, ui_1.LIST_DISPLAY_CARDS);
    return (react_1.default.createElement(ui_1.ListDisplayProvider, { initialListDisplay: initialListDisplay, preferenceName: listDisplayPreferenceName },
        react_1.default.createElement(ui_1.List, Object.assign({ actions: react_1.default.createElement(ApiListActions, null), filters: react_1.default.createElement(ApiFilter, null), sort: defaultSort, bulkActionButtons: false, component: ApiListComponent }, props),
            react_1.default.createElement(ApiListDisplay, null))));
};
const ApiListComponent = props => react_1.default.createElement("div", Object.assign({}, props));
const useApiFilterStyles = styles_1.makeStyles({
    searchInput: {
        minWidth: '300px',
    },
});
const ApiFilter = props => {
    const translate = ra_core_1.useTranslate();
    const classes = useApiFilterStyles();
    return (react_1.default.createElement(react_admin_1.Filter, Object.assign({}, props),
        react_1.default.createElement(react_admin_1.SearchInput, { source: "q", className: classes.searchInput, alwaysOn: true, placeholder: translate('resources.apis.list.filters.search') }),
        react_1.default.createElement(react_admin_1.SelectInput, { source: "accessStatus", choices: [
                {
                    id: 'public',
                    name: 'resources.apis.accessStatus.public',
                },
                {
                    id: 'private',
                    name: 'resources.apis.accessStatus.private',
                },
            ] }),
        react_1.default.createElement(react_admin_1.SelectInput, { source: "portalStatus", choices: [
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
        react_1.default.createElement(react_admin_1.SelectInput
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
        react_1.default.createElement(react_admin_1.ReferenceArrayInput, { source: "tags", reference: "tags" },
            react_1.default.createElement(react_admin_1.SelectArrayInput, { optionText: "name" }))));
};
const ApiListDisplay = props => {
    const [display] = ui_1.useListDisplay();
    if (display === ui_1.LIST_DISPLAY_CARDS) {
        return (react_1.default.createElement(ui_1.CardGrid, Object.assign({}, props),
            react_1.default.createElement(ApiCard_1.ApiCard, null)));
    }
    return (react_1.default.createElement(Card_1.default, null,
        react_1.default.createElement(ui_1.Datagrid, Object.assign({ rowClick: "show" }, props),
            react_1.default.createElement(ui_1.TruncatedTextField, { source: "name" }),
            react_1.default.createElement(ui_1.MarkdownField, { source: "description", stripTags: true, truncate: true }),
            react_1.default.createElement(TagsField_1.TagsField, { source: "tags", sortable: false }),
            react_1.default.createElement(react_admin_1.DateField, { source: "createTs" }),
            react_1.default.createElement(ui_1.TruncatedTextField, { source: "version", label: "resources.apis.fields.versionShort" }),
            react_1.default.createElement(react_admin_1.TextField, { source: "ssgServiceType" }),
            react_1.default.createElement(VisibilityField_1.VisibilityField, { source: "accessStatus" }),
            react_1.default.createElement(LastUpdateField_1.LastUpdateField, { source: "modifyTs" }),
            react_1.default.createElement(ui_1.AccessField, { source: "portalStatus", translationKey: "resources.apis.portalStatus" }))));
};
const useApiListActionsStyles = styles_1.makeStyles(theme => ({
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
    const [display] = ui_1.useListDisplay();
    return (react_1.default.createElement(react_admin_1.TopToolbar, Object.assign({ className: classnames_1.default(classes.root, className) }, react_admin_1.sanitizeListRestProps(props)),
        filters &&
            react_1.cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            }),
        display === ui_1.LIST_DISPLAY_CARDS ? (react_1.default.createElement(exports.ApiListSortButton, { resource: resource, currentSort: currentSort })) : null,
        react_1.default.createElement(ui_1.ListDisplayButton, { className: classes.button })));
};
exports.ApiListSortButton = props => (react_1.default.createElement(ui_1.SortButton, Object.assign({}, props),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.apis.list.sort.name.asc", sort: SortByNameASC }),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.apis.list.sort.name.desc", sort: SortByNameDESC }),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.apis.list.sort.createTs.desc", sort: SortByCreateTsDESC }),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.apis.list.sort.createTs.asc", sort: SortByCreateTsASC }),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.apis.list.sort.modifyTs.desc", sort: SortByModifyTsDESC }),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.apis.list.sort.modifyTs.asc", sort: SortByModifyTsASC })));
const SortByNameASC = { field: 'name', order: 'ASC' };
const SortByNameDESC = { field: 'name', order: 'DESC' };
const SortByCreateTsASC = { field: 'createTs', order: 'ASC' };
const SortByCreateTsDESC = { field: 'createTs', order: 'DESC' };
const SortByModifyTsASC = { field: 'modifyTs', order: 'ASC' };
const SortByModifyTsDESC = { field: 'modifyTs', order: 'DESC' };
//# sourceMappingURL=ApiList.js.map