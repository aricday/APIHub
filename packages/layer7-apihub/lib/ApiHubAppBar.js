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
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const styles_1 = require("@material-ui/core/styles");
const react_admin_1 = require("react-admin");
const ApiHubUserMenu_1 = require("./ApiHubUserMenu");
const ApiHubLanguageSwitcher_1 = require("./ApiHubLanguageSwitcher");
const SidebarButton_1 = require("./SidebarButton");
const useStyles = styles_1.makeStyles(theme => ({
    toolbar: {
        paddingRight: 24,
    },
    header: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        minWidth: '156px',
    },
    divider: {
        alignSelf: 'stretch',
        backgroundColor: theme.palette.primary.contrastText,
        height: 'auto',
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(2),
    },
}), { name: 'RaAppBar' });
/**
 * The ApiHub AppBar used in the ApiHub Layout.
 *
 * @param {*} props AppBar properties
 */
exports.ApiHubAppBar = (_a) => {
    var { children, classes: classesOverride, className, languagesMenu, logo, logout, open, sidebarButton, title, userMenu } = _a, rest = __rest(_a, ["children", "classes", "className", "languagesMenu", "logo", "logout", "open", "sidebarButton", "title", "userMenu"]);
    const classes = useStyles({ classes: classesOverride });
    react_admin_1.useLocale(); // Make sure the locale change would rerender the component
    return (react_1.default.createElement(react_admin_1.HideOnScroll, null,
        react_1.default.createElement(AppBar_1.default, Object.assign({ className: className, color: "secondary", elevation: 0 }, rest),
            react_1.default.createElement(Toolbar_1.default, { disableGutters: true, variant: "regular", className: classes.toolbar },
                react_1.cloneElement(sidebarButton, { open }),
                react_1.default.createElement("div", { className: classes.header }, children),
                react_1.default.createElement(react_admin_1.LoadingIndicator, null),
                react_1.cloneElement(languagesMenu),
                react_1.default.createElement(Divider_1.default, { className: classes.divider, orientation: "vertical" }),
                react_1.cloneElement(userMenu, { logout })))));
};
exports.ApiHubAppBar.defaultProps = {
    userMenu: react_1.default.createElement(ApiHubUserMenu_1.ApiHubUserMenu, null),
    languagesMenu: react_1.default.createElement(ApiHubLanguageSwitcher_1.ApiHubLanguageSwitcher, null),
    sidebarButton: react_1.default.createElement(SidebarButton_1.SidebarButton, null),
};
//# sourceMappingURL=ApiHubAppBar.js.map