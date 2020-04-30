"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const core_1 = require("@material-ui/core");
const ResetPasswordToolbar_1 = require("./ResetPasswordToolbar");
const useStyles = core_1.makeStyles(theme => ({
    form: {
        '& >:first-child': {
            padding: 0,
        },
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginBottom: theme.spacing(6),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
    instructions: {
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
    description: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(6),
    },
}));
exports.ResetPasswordForm = props => {
    const { onSubmit = () => { } } = props;
    const classes = useStyles(props);
    const translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "h2", className: classes.title }, translate('apihub.reset_password.title')),
        react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.instructions }, translate('apihub.reset_password.form_details.instructions')),
        react_1.default.createElement(core_1.Typography, { variant: "subtitle2", className: classes.description }, translate('apihub.reset_password.form_details.description')),
        react_1.default.createElement(react_admin_1.SimpleForm, { className: classes.form, save: onSubmit, toolbar: react_1.default.createElement(ResetPasswordToolbar_1.ResetPasswordToolbar, null) },
            react_1.default.createElement(react_admin_1.TextInput, { source: "username", type: "text", label: "apihub.reset_password.fields.username", variant: "outlined", fullWidth: true, validate: react_admin_1.required(), autoFocus: true }))));
};
//# sourceMappingURL=ResetPasswordForm.js.map