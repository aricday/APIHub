"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const core_1 = require("@material-ui/core");
const final_form_1 = require("final-form");
const NewPasswordToolbar_1 = require("./NewPasswordToolbar");
const ui_1 = require("../ui");
const validatePassword_1 = require("../authentication/validatePassword");
const useStyles = core_1.makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
exports.NewPasswordForm = props => {
    const { onSubmit } = props;
    const classes = useStyles(props);
    const validate = ({ newPassword, confirm_password }) => {
        if (newPassword !== confirm_password) {
            return {
                [final_form_1.FORM_ERROR]: 'resources.userContexts.validation.error_password_match',
            };
        }
    };
    return (react_1.default.createElement(react_admin_1.SimpleForm, Object.assign({ className: classes.form, save: onSubmit, toolbar: react_1.default.createElement(NewPasswordToolbar_1.NewPasswordToolbar, null), validate: validate }, props),
        react_1.default.createElement(ui_1.PasswordInput, { source: "password", label: "resources.userContexts.fields.userDetails.current_password", fullWidth: true, validate: [ra_core_1.required()], title: "resources.userContexts.validation.tooltip_password" }),
        react_1.default.createElement(ui_1.PasswordInput, { source: "newPassword", label: "resources.userContexts.fields.userDetails.password", fullWidth: true, validate: [ra_core_1.required(), validatePassword_1.validatePassword], title: "resources.userContexts.validation.tooltip_password" }),
        react_1.default.createElement(ui_1.PasswordInput, { source: "confirm_password", label: "resources.userContexts.fields.userDetails.confirm_password", fullWidth: true, validate: ra_core_1.required(), title: "resources.userContexts.tooltip_password_confirm" })));
};
//# sourceMappingURL=NewPasswordForm.js.map