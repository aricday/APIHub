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
const ui_1 = require("../../ui");
const validatePassword_1 = require("../validatePassword");
const useStyles = core_1.makeStyles(theme => ({
    form: {
        '& >:first-child': {
            padding: 0,
        },
        '& .ra-input': {
            marginTop: theme.spacing(2),
        },
    },
}));
exports.NewPasswordForm = props => {
    const { onSubmit } = props;
    const classes = useStyles(props);
    const validate = ({ password, confirm_password }) => {
        if (password !== confirm_password) {
            return {
                [final_form_1.FORM_ERROR]: 'apihub.new_password.validation.error_password_match',
            };
        }
    };
    return (react_1.default.createElement(react_admin_1.SimpleForm, Object.assign({ className: classes.form, save: onSubmit, toolbar: react_1.default.createElement(NewPasswordToolbar_1.NewPasswordToolbar, null), validate: validate }, props),
        react_1.default.createElement(ui_1.PasswordInput, { source: "password", label: "apihub.new_password.fields.password", fullWidth: true, validate: [ra_core_1.required(), validatePassword_1.validatePassword], title: "apihub.new_password.validation.tooltip_password" }),
        react_1.default.createElement(ui_1.PasswordInput, { source: "confirm_password", label: "apihub.new_password.fields.confirm_password", fullWidth: true, validate: ra_core_1.required(), title: "apihub.new_password.validation.tooltip_password_confirm" })));
};
//# sourceMappingURL=NewPasswordForm.js.map