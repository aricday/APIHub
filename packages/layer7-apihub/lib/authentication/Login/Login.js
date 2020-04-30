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
const react_router_dom_1 = require("react-router-dom");
const core_1 = require("@material-ui/core");
const react_admin_1 = require("react-admin");
const ui_1 = require("../../ui");
const LoginForm_1 = require("./LoginForm");
const AuthenticationLayout_1 = require("../AuthenticationLayout");
const useStyles = core_1.makeStyles(theme => ({
    signUpTitle: {
        fontSize: theme.typography.fontSize * 2,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
}));
/**
 * The page displaying the login form
 *
 * @param {*} Header A React Component used as the page header
 * @param {*} Content A React Component used to display some content next to the login form
 * @param {*} Footer A React Component used as the page footer
 *
 * @example <caption>Simple usage</caption>
 * <LoginPage />
 *
 * const MyApp = props => <Admin loginPage={MyLogin} {...props} />
 *
 * @example <caption>With customized parts</caption>
 * const Header = () => <header><h1>My company</h1></header>
 * const Footer = () => <footer>Copyright © 2020 My Company. All Rights Reserved</footer>
 * const Content = () => <section><p>Welcome to My Product.</p></section>
 *
 * const MyLoginPage = props => (
 *     <LoginPage
 *         Header={CustomHeader}
 *         Content={CustomContent}
 *         Footer={CustomFooter}
 *         {...props}
 *     />
 * );
 *
 * const MyApp = props => <Admin loginPage={MyLogin} {...props} />
 */
exports.LoginPage = props => {
    const { Layout = AuthenticationLayout_1.AuthenticationLayout } = props;
    const clearNotifications = ui_1.useClearNotifications();
    react_1.useEffect(() => {
        clearNotifications();
    }, [clearNotifications]);
    // Disabled until a new API is available to get those settings
    // const {
    //     signUpEnabled,
    //     simpleCredentialsEnabled,
    // } = useAuthenticationConfiguration();
    const signUpEnabled = true;
    const simpleCredentialsEnabled = true;
    return (react_1.default.createElement(Layout, Object.assign({}, props),
        simpleCredentialsEnabled ? react_1.default.createElement(LoginForm_1.LoginForm, null) : null,
        signUpEnabled ? react_1.default.createElement(exports.SignUp, null) : null));
};
exports.SignUp = props => {
    const classes = useStyles(props);
    const translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "h2", className: classes.signUpTitle, color: "textSecondary" }, translate('apihub.login.actions.sign_up_title')),
        react_1.default.createElement(core_1.Button, { component: react_router_dom_1.Link, to: "/signup", variant: "outlined", color: "primary", disabled: true }, translate('apihub.login.actions.sign_up'))));
};
//# sourceMappingURL=Login.js.map