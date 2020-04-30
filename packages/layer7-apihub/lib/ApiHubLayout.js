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
const styles_1 = require("@material-ui/core/styles");
const ApiHubAppBar_1 = require("./ApiHubAppBar");
const ApiHubSidebar_1 = require("./ApiHubSidebar");
const ApiHubMenu_1 = require("./ApiHubMenu");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        position: 'relative',
        minWidth: 'fit-content',
        width: '100%',
    },
    appFrame: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: theme.spacing(9),
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(3),
    },
}));
/**
 * The ApiHub Layout used in the ApiHub Admin.
 *
 * @param {*} appBar The AppBar component
 * @param {*} sidebar The Sidebar component
 * @param {*} menu The Menu component
 * @param {*} rest The other Layout properties
 */
exports.ApiHubLayout = (_a) => {
    var { appBar = ApiHubAppBar_1.ApiHubAppBar, sidebar = ApiHubSidebar_1.ApiHubSidebar, menu = ApiHubMenu_1.ApiHubMenu } = _a, rest = __rest(_a, ["appBar", "sidebar", "menu"]);
    const classes = useStyles(rest);
    return (react_1.default.createElement(react_admin_1.Layout, Object.assign({ classes: classes, appBar: appBar, sidebar: sidebar, menu: menu }, rest)));
};
//# sourceMappingURL=ApiHubLayout.js.map