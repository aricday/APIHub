"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_admin_1 = require("react-admin");
const react_router_dom_1 = require("react-router-dom");
const core_1 = require("@material-ui/core");
const LoginToolbar_1 = require("./LoginToolbar");
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
}));
exports.LoginForm = props => {
    const login = react_admin_1.useLogin();
    const classes = useStyles(props);
    const translate = react_admin_1.useTranslate();
    const [isLoading, setIsLoading] = react_1.useState(null);
    const [error, setError] = react_1.useState(null);
    const submit = async ({ username, password }) => {
        setError(null);
        setIsLoading(true);
        try {
            await login({ scheme: 'credentials', username, password });
        }
        catch (_a) {
            setError('apihub.login.notifications.invalid_credentials');
        }
        setIsLoading(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "h2", className: classes.title }, translate('apihub.login.title')),
        react_1.default.createElement(react_admin_1.SimpleForm, { className: classes.form, save: submit, toolbar: react_1.default.createElement(LoginToolbar_1.LoginToolbar, { loading: isLoading, error: error }) },
            react_1.default.createElement(react_admin_1.TextInput, { source: "username", type: "text", label: "apihub.login.fields.username", variant: "outlined", fullWidth: true, validate: react_admin_1.required() }),
            react_1.default.createElement(react_admin_1.PasswordInput, { source: "password", label: "apihub.login.fields.password", variant: "outlined", fullWidth: true, validate: react_admin_1.required() })),
        react_1.default.createElement(core_1.Typography, { variant: "body1" },
            react_1.default.createElement(core_1.Link, { component: react_router_dom_1.Link, to: "/reset-password" }, translate('apihub.login.actions.forgot_password')))));
};
//# sourceMappingURL=LoginForm.js.map