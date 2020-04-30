"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const core_1 = require("@material-ui/core");
const react_router_dom_1 = require("react-router-dom");
const icons_1 = require("@material-ui/icons");
const useStyles = core_1.makeStyles(theme => ({
    form: {
        '& >:first-child': {
            padding: 0,
        },
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginBottom: theme.spacing(6),
    },
    instructions: {
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightBold,
    },
    description: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(6),
    },
    link: {
        display: 'flex',
        alignItems: 'center',
    },
}));
exports.ResetPasswordConfirm = props => {
    const classes = useStyles(props);
    const translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "h2", className: classes.title }, translate('apihub.reset_password_confirm.title')),
        react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.instructions }, translate('apihub.reset_password_confirm.form_details.instructions')),
        react_1.default.createElement(core_1.Typography, { variant: "subtitle2", className: classes.description }, translate('apihub.reset_password_confirm.form_details.description')),
        react_1.default.createElement(core_1.Typography, { variant: "body1" },
            react_1.default.createElement(core_1.Link, { component: react_router_dom_1.Link, to: "/login", className: classes.link },
                react_1.default.createElement(icons_1.ChevronRight, null),
                translate('apihub.reset_password_confirm.actions.open_login_page')))));
};
//# sourceMappingURL=ResetPasswordConfirm.js.map