"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const styles_1 = require("@material-ui/core/styles");
const useSidebarStyles = styles_1.makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
    },
}));
/**
 * The ApiHub Sidebar used in the ApiHub Layout.
 *
 * @param {*} rest Sidebar properties
 */
exports.ApiHubSidebar = props => {
    const classes = useSidebarStyles();
    return react_1.default.createElement(react_admin_1.Sidebar, Object.assign({ className: classes.root }, props));
};
//# sourceMappingURL=ApiHubSidebar.js.map