"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ra_core_1 = require("ra-core");
const core_1 = require("@material-ui/core");
const react_router_dom_1 = require("react-router-dom");
const useStyles = core_1.makeStyles(theme => ({
    root: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));
exports.InvalidRequest = () => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "body1", className: classes.root }, translate('apihub.account_setup.notifications.invalid_request')),
        react_1.default.createElement(core_1.Button, { color: "primary", variant: "contained", component: react_router_dom_1.Link, to: "/login" }, translate('apihub.account_setup.actions.open_login_page'))));
};
//# sourceMappingURL=InvalidRequest.js.map