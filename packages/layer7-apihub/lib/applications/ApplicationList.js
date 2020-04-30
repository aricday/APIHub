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
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const preferences_1 = require("../preferences");
const ui_1 = require("../ui");
const ApplicationCard_1 = require("./ApplicationCard");
const defaultSort = { field: 'uuid', order: 'ASC' };
const listDisplayPreferenceName = 'listDisplay/applications';
exports.ApplicationList = props => {
    const initialListDisplay = preferences_1.readApiHubPreference(listDisplayPreferenceName, ui_1.LIST_DISPLAY_CARDS);
    return (react_1.default.createElement(ui_1.ListDisplayProvider, { initialListDisplay: initialListDisplay, preferenceName: listDisplayPreferenceName },
        react_1.default.createElement(ui_1.List, Object.assign({ actions: react_1.default.createElement(ApplicationListActions, null), filter: { $select: 'Name,Uuid,ApiKey,Status,Description' }, filters: react_1.default.createElement(ApplicationFilter, null), sort: defaultSort, bulkActionButtons: false, component: ApplicationListComponent }, props),
            react_1.default.createElement(ApplicationListDisplay, null))));
};
const ApplicationListComponent = props => react_1.default.createElement("div", Object.assign({}, props));
const ApplicationFilter = props => {
    return (react_1.default.createElement(react_admin_1.Filter, Object.assign({}, props),
        react_1.default.createElement(react_admin_1.SelectInput, { source: "status", choices: [
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
    const [display] = ui_1.useListDisplay();
    if (display === ui_1.LIST_DISPLAY_CARDS) {
        return (react_1.default.createElement(ui_1.CardGrid, Object.assign({}, props),
            react_1.default.createElement(ApplicationCard_1.ApplicationCard, null)));
    }
    return (react_1.default.createElement(Card_1.default, null,
        react_1.default.createElement(ui_1.Datagrid, Object.assign({ rowClick: "show" }, props),
            react_1.default.createElement(ui_1.TruncatedTextField, { source: "name" }),
            react_1.default.createElement(ui_1.AccessField, { source: "status", translationKey: "resources.applications.status" }))));
};
const useApplicationListActionsStyles = styles_1.makeStyles(theme => ({
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
        display === ui_1.LIST_DISPLAY_CARDS ? (react_1.default.createElement(exports.ApplicationListSortButton, { resource: resource, currentSort: currentSort })) : null,
        react_1.default.createElement(ui_1.ListDisplayButton, { className: classes.button })));
};
exports.ApplicationListSortButton = props => (react_1.default.createElement(ui_1.SortButton, Object.assign({}, props),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.applications.list.sort.name.asc", sort: SortByNameASC }),
    react_1.default.createElement(ui_1.SortMenuItem, { label: "resources.applications.list.sort.name.desc", sort: SortByNameDESC })));
const SortByNameASC = { field: 'name', order: 'ASC' };
const SortByNameDESC = { field: 'name', order: 'DESC' };
//# sourceMappingURL=ApplicationList.js.map