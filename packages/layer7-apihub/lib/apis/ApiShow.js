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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const styles_1 = require("@material-ui/core/styles");
const get_1 = __importDefault(require("lodash/get"));
const ui_1 = require("../ui");
const userContexts_1 = require("../dataProvider/userContexts");
const userContexts_2 = require("../userContexts");
const Overview_1 = require("./Overview");
const Documentation_1 = require("./Documentation");
const Specs_1 = require("./Specs");
const ApiTitle = ({ record }) => (record ? record.name : '');
const useTabStyles = styles_1.makeStyles(theme => ({
    root: {
        textTransform: 'capitalize',
    },
    selected: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
    },
}));
exports.ApiShow = (_a) => {
    var { id } = _a, rest = __rest(_a, ["id"]);
    const { data: userContexts } = react_admin_1.useGetOne('userContexts', userContexts_1.CurrentUserId, {
        action: react_admin_1.CRUD_GET_ONE,
    });
    const { data: apisPermissions } = react_admin_1.useQuery({
        type: 'getPermissions',
        resource: 'apis',
        payload: { id },
    });
    return (react_1.default.createElement(ui_1.Show, Object.assign({ title: react_1.default.createElement(ApiTitle, null), id: id }, rest),
        react_1.default.createElement(ApiShowTabs, { userIsPublisher: userContexts_2.isPublisher(userContexts), userCanEdit: get_1.default(apisPermissions, 'canEdit', false), userCanDelete: get_1.default(apisPermissions, 'canEdit', false) })));
};
exports.isSoapApi = record => {
    // The API type is defined as ssgServiceType in the API list page,
    // but as apiServiceType in the API show page.
    // The react-admin engine first renders the API show page with the data of the API list page
    // in order to improve the user experience.
    // So we need to test both names to avoid a visual glitch when rendering the Tabs.
    const type = get_1.default(record, 'apiServiceType', null) ||
        get_1.default(record, 'ssgServiceType', null);
    return type && type.toLowerCase() === 'soap';
};
const ApiShowTabs = props => {
    const translate = ra_core_1.useTranslate();
    const classes = useTabStyles(props);
    const { userIsPublisher, userCanEdit, userCanDelete } = props, rest = __rest(props, ["userIsPublisher", "userCanEdit", "userCanDelete"]);
    const showSpecs = !exports.isSoapApi(props.record);
    return (react_1.default.createElement(react_admin_1.TabbedShowLayout, Object.assign({}, rest),
        react_1.default.createElement(react_admin_1.Tab, { label: translate('resources.apis.overview.title'), classes: classes },
            react_1.default.createElement(Overview_1.Overview, { userIsPublisher: userIsPublisher })),
        showSpecs && (react_1.default.createElement(react_admin_1.Tab, { label: translate('resources.apis.specification.title'), path: "spec", classes: classes },
            react_1.default.createElement(Specs_1.Specs, null))),
        react_1.default.createElement(react_admin_1.Tab, { label: translate('resources.apis.documentation.title'), path: "doc", classes: classes },
            react_1.default.createElement(Documentation_1.Documentation, { userCanEdit: userCanEdit, userCanDelete: userCanDelete }))));
};
//# sourceMappingURL=ApiShow.js.map