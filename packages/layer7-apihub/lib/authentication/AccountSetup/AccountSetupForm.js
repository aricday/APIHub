"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const final_form_1 = require("final-form");
const ApiHubContext_1 = require("../../ApiHubContext");
const ui_1 = require("../../ui");
const TermsInput_1 = require("./TermsInput");
const AccountSetupToolbar_1 = require("./AccountSetupToolbar");
const validatePassword_1 = require("../validatePassword");
const useAccountData_1 = require("./useAccountData");
const mustBeTrue = () => value => !value
    ? 'apihub.account_setup.terms_of_use.terms_of_use_validation'
    : undefined;
const checkUnicity = url => async (value) => {
    if (value.length < 6) {
        return;
    }
    try {
        await useAccountData_1.checkUsernameUnicity(url, value);
    }
    catch (_a) {
        return 'apihub.account_setup.validation.error_username_not_unique';
    }
};
const useStyles = core_1.makeStyles(theme => ({
    form: {
        '& >:first-child': {
            padding: 0,
        },
        '& .ra-input': {
            marginTop: theme.spacing(2),
        },
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginBottom: theme.spacing(6),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
}));
exports.AccountSetupForm = ({ initialValues, onSubmit }) => {
    const classes = useStyles();
    const translate = react_admin_1.useTranslate();
    const { urlWithApi } = ApiHubContext_1.useApiHub();
    const validate = ({ password, confirm_password }) => {
        if (password !== confirm_password) {
            return {
                [final_form_1.FORM_ERROR]: 'apihub.account_setup.validation.error_password_match',
            };
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "h2", className: classes.title }, translate('apihub.account_setup.title')),
        react_1.default.createElement(react_admin_1.SimpleForm, { className: classes.form, save: onSubmit, toolbar: react_1.default.createElement(AccountSetupToolbar_1.AccountSetupToolbar, null), validate: validate, initialValues: initialValues },
            react_1.default.createElement(react_admin_1.TextInput, { source: "firstName", type: "text", label: "apihub.account_setup.fields.firstname", variant: "outlined", fullWidth: true, validate: react_admin_1.required() }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "lastName", type: "text", label: "apihub.account_setup.fields.lastname", variant: "outlined", fullWidth: true, validate: react_admin_1.required() }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "email", type: "email", label: "apihub.account_setup.fields.email", variant: "outlined", fullWidth: true, validate: react_admin_1.required(), disabled: true }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "userName", type: "text", label: "apihub.account_setup.fields.username", variant: "outlined", autoComplete: "new_username", fullWidth: true, InputProps: {
                    endAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "end" },
                        react_1.default.createElement(ui_1.HtmlTooltip, { className: classes.tootip, title: translate('apihub.tooltip_username'), placement: "right", arrow: true },
                            react_1.default.createElement(icons_1.InfoOutlined, null)))),
                }, validate: [
                    react_admin_1.required(),
                    react_admin_1.minLength(6),
                    react_admin_1.maxLength(60),
                    checkUnicity(urlWithApi),
                ] }),
            react_1.default.createElement(ui_1.PasswordInput, { source: "password", label: "apihub.account_setup.fields.password", variant: "outlined", autoComplete: "new_password", fullWidth: true, validate: [react_admin_1.required(), validatePassword_1.validatePassword], title: "apihub.account_setup.validation.tooltip_password" }),
            react_1.default.createElement(ui_1.PasswordInput, { source: "confirm_password", label: "apihub.account_setup.fields.confirm_password", variant: "outlined", autoComplete: "confirm_new_password", fullWidth: true, validate: [react_admin_1.required()], title: "apihub.account_setup.validation.tooltip_password_confirm" }),
            react_1.default.createElement(TermsInput_1.TermsInput, { source: "terms", type: "checkbox", validate: [mustBeTrue()] }))));
};
//# sourceMappingURL=AccountSetupForm.js.map