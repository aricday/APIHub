"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const core_1 = require("@material-ui/core");
const react_final_form_1 = require("react-final-form");
const useStyles = core_1.makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexBasis: '100%',
        backgroundColor: 'transparent',
        padding: 0,
        marginTop: theme.spacing(2),
    },
    error: {
        marginTop: theme.spacing(2),
    },
    success: {
        color: theme.palette.success.main,
        marginTop: theme.spacing(2),
    },
}));
const subscription = { error: true, touched: true, submitSucceeded: true };
exports.AccountSetupToolbar = props => {
    const classes = useStyles(props);
    return (react_1.default.createElement(react_final_form_1.FormSpy, { subscription: subscription }, ({ error, touched }) => {
        const showError = error && touched.password && touched.confirm_password;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            showError ? (react_1.default.createElement(core_1.Typography, { variant: "body1", color: "error", className: classes.error },
                react_1.default.createElement(ra_core_1.ValidationError, { error: error }))) : null,
            react_1.default.createElement(react_admin_1.Toolbar, Object.assign({ className: classes.toolbar }, props),
                react_1.default.createElement(react_admin_1.SaveButton, { icon: react_1.default.createElement("span", null), label: "apihub.account_setup.actions.submit" }))));
    }));
};
//# sourceMappingURL=AccountSetupToolbar.js.map