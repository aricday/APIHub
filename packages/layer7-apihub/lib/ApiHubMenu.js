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
const react_redux_1 = require("react-redux");
const classnames_1 = __importDefault(require("classnames"));
const ra_core_1 = require("ra-core");
const core_1 = require("@material-ui/core");
const icons_1 = require("./ui/icons");
const useStyles = core_1.makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
}, { name: 'RaMenu' });
/**
 * The ApiHub Menu used in the ApiHub Sidebar.
 *
 * Inspired by https://github.com/marmelab/react-admin/blob/2c167a4693b4ca060f72b272f19e9af8f41eb091/packages/ra-ui-materialui/src/layout/Menu.tsx
 *
 * @param {*} props Menu properties
 */
exports.ApiHubMenu = props => {
    const { classes: classesOverride, className, dense, hasDashboard, onMenuClick = () => null, logout } = props, rest = __rest(props, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "logout"]);
    const translate = ra_core_1.useTranslate();
    const classes = useStyles(props);
    const isXSmall = core_1.useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = react_redux_1.useSelector(state => state.admin.ui.sidebarOpen);
    // Used to force redraw on navigation
    react_redux_1.useSelector(state => state.router.location.pathname);
    return (react_1.default.createElement("div", Object.assign({ className: classnames_1.default(classes.main, className) }, rest),
        hasDashboard && (react_1.default.createElement(react_admin_1.MenuItemLink, Object.assign({ onClick: onMenuClick, to: "/", exact: true, primaryText: translate('ra.page.dashboard'), leftIcon: react_1.default.createElement(icons_1.IconHome, null), dense: dense, sidebarIsOpen: open }, props))),
        react_1.default.createElement(react_admin_1.MenuItemLink, { key: "apis", to: "/apis", primaryText: translate(`resources.apis.name`, {
                smart_count: 2,
            }), leftIcon: react_1.default.createElement(icons_1.IconApi, null), onClick: onMenuClick, dense: dense, sidebarIsOpen: open }),
        react_1.default.createElement(react_admin_1.MenuItemLink, { key: "applications", to: "/applications", primaryText: translate(`resources.applications.name`, {
                smart_count: 2,
            }), leftIcon: react_1.default.createElement(icons_1.IconApps, null), onClick: onMenuClick, dense: dense, sidebarIsOpen: open }),
        isXSmall && logout));
};
//# sourceMappingURL=ApiHubMenu.js.map