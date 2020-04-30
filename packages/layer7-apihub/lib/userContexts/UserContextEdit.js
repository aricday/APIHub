"use strict";
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
const react_admin_1 = require("react-admin");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const core_1 = require("@material-ui/core");
const ui_1 = require("../ui");
const ApiHubContext_1 = require("../ApiHubContext");
const usePasswordEncryption_1 = require("../authentication/usePasswordEncryption");
const NewPasswordForm_1 = require("./NewPasswordForm");
const UserContextTitle = () => {
    const translate = react_admin_1.useTranslate();
    return translate('resources.userContexts.title');
};
const validateField = [react_admin_1.required()];
exports.UserContextEdit = props => {
    const classes = useUserContextEditStyles();
    return (react_1.default.createElement(ui_1.Edit, Object.assign({}, props, { title: react_1.default.createElement(UserContextTitle, null), aside: react_1.default.createElement(exports.UserContextEditAside, null), successMessage: "resources.userContexts.notifications.update_success" }),
        react_1.default.createElement(react_admin_1.SimpleForm, { toolbar: react_1.default.createElement(UserContextEditToolbar, null), redirect: false },
            react_1.default.createElement(react_admin_1.TextField, { addLabel: true, source: "userDetails.username", className: classes.field }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "userDetails.lastName", className: classes.field, validate: validateField }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "userDetails.firstName", className: classes.field, validate: validateField }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "userDetails.email", className: classes.field, validate: validateField }))));
};
const useUserContextEditStyles = core_1.makeStyles({
    field: {
        width: 456,
    },
});
const UserContextEditToolbar = props => (react_1.default.createElement(react_admin_1.Toolbar, Object.assign({}, props),
    react_1.default.createElement(react_admin_1.SaveButton, null)));
exports.UserContextEditAside = ({ record }) => {
    const classes = useUserContextEditAsideStyles();
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(exports.UserContextEditNewPassword, { record: record })));
};
const useUpdatePassword = ({ user }) => {
    var _a;
    const { url } = ApiHubContext_1.useApiHub();
    const notify = react_admin_1.useNotify();
    const [publicKey, encrypt] = usePasswordEncryption_1.usePasswordEncryption();
    const uuid = (_a = user) === null || _a === void 0 ? void 0 : _a.uuid;
    return react_1.useCallback(async ({ password, newPassword }) => {
        let finalPassword = password;
        let finalNewPassword = newPassword;
        if (publicKey) {
            const [encryptedPassword, encryptedNewPassword,] = await Promise.all([
                encrypt(password),
                encrypt(newPassword),
            ]);
            finalPassword = encryptedPassword;
            finalNewPassword = encryptedNewPassword;
        }
        // This is need to get a special cookie required for password change
        await fetch(`${url}/admin/sessionCheck`, {
            credentials: 'include',
        });
        react_admin_1.fetchUtils
            .fetchJson(`${url}/admin/v2/users/password/change`, {
            credentials: 'include',
            body: JSON.stringify({
                password: finalPassword,
                newPassword: finalNewPassword,
                uuid,
            }),
            method: 'PUT',
        })
            .then(() => {
            notify('resources.userContexts.notifications.confirm_password_change');
        })
            .catch(error => {
            if (error.status === 400) {
                notify('resources.userContexts.notifications.invalid_password', 'warning');
            }
            notify('resources.userContexts.notifications.update_error', 'warning');
        });
    }, [encrypt, notify, publicKey, url, uuid]);
};
exports.UserContextEditNewPassword = ({ record }) => {
    const handleSubmit = useUpdatePassword({ user: record });
    return (react_1.default.createElement(Card_1.default, null,
        react_1.default.createElement(NewPasswordForm_1.NewPasswordForm, { onSubmit: handleSubmit })));
};
const useUserContextEditAsideStyles = core_1.makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(3),
    },
}));
//# sourceMappingURL=UserContextEdit.js.map