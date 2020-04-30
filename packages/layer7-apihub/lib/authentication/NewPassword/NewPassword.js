"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const ra_core_1 = require("ra-core");
const ApiHubContext_1 = require("../../ApiHubContext");
const extractTokenFromUrl_1 = require("../extractTokenFromUrl");
const NewPasswordForm_1 = require("./NewPasswordForm");
const VerifyingToken_1 = require("./VerifyingToken");
const InvalidToken_1 = require("./InvalidToken");
const Success_1 = require("./Success");
const AuthenticationLayout_1 = require("../AuthenticationLayout");
const usePasswordEncryption_1 = require("../usePasswordEncryption");
/**
 * The page displaying the form used to create a new password
 *
 * @param {*} Header A React Component used as the page header
 * @param {*} Content A React Component used to display some content next to the new password form
 * @param {*} Footer A React Component used as the page footer
 *
 * @example <caption>Simple usage</caption>
 * <NewPasswordPage />
 *
 * const MyApp = props => <Admin newPasswordPage={MyNewPassword} {...props} />
 *
 * @example <caption>With customized parts</caption>
 * const Header = () => <header><h1>My company</h1></header>
 * const Footer = () => <footer>Copyright © 2020 My Company. All Rights Reserved</footer>
 * const Content = () => <section><p>Welcome to My Product.</p></section>
 *
 * const MyNewPasswordPage = props => (
 *     <NewPasswordPage
 *         Header={CustomHeader}
 *         Content={CustomContent}
 *         Footer={CustomFooter}
 *         {...props}
 *     />
 * );
 *
 * const MyApp = props => <Admin newPasswordPage={MyNewPassword} {...props} />
 */
exports.NewPasswordPage = (_a) => {
    var { location, Layout = AuthenticationLayout_1.AuthenticationLayout } = _a, props = __rest(_a, ["location", "Layout"]);
    const [state, handleSubmit] = useSetNewPassword(location);
    const translate = ra_core_1.useTranslate();
    const classes = useStyles(props);
    return (react_1.default.createElement(Layout, Object.assign({}, props), state === 'verifying_token' ? (react_1.default.createElement(VerifyingToken_1.VerifyingToken, null)) : state === 'request_new_password' ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "h2", className: classes.title }, translate('apihub.new_password.title')),
        react_1.default.createElement(NewPasswordForm_1.NewPasswordForm, { onSubmit: handleSubmit, variant: "outlined" }))) : state === 'invalid_token' ? (react_1.default.createElement(InvalidToken_1.InvalidToken, null)) : state === 'success' ? (react_1.default.createElement(Success_1.Success, null)) : null));
};
const useStyles = core_1.makeStyles(theme => ({
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginBottom: theme.spacing(6),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
}));
/**
 * This hook extracts the new password token from the url, verifies it and provides
 * a function to set the new password.
 *
 * It returns a tupple containing the current status (verifying_token, invalid_token, request_new_password and success)
 * and a function to actually submit the new password.
 */
const useSetNewPassword = location => {
    const [state, setState] = react_1.useState('verifying_token');
    const { url } = ApiHubContext_1.useApiHub();
    const token = extractTokenFromUrl_1.extractTokenFromUrl(location.hash);
    const [publicKey, encrypt] = usePasswordEncryption_1.usePasswordEncryption();
    react_1.useEffect(() => {
        if (state === 'verifying_token') {
            verifyNewPasswordTokenValid(url, token).then(isVerified => {
                setState(isVerified ? 'request_new_password' : 'invalid_token');
            });
        }
    }, [url, token, state]);
    const handleSubmit = ({ password }) => {
        let finalPassword = password;
        if (publicKey) {
            finalPassword = encrypt(password);
        }
        return submitNewPassword(url, {
            password: finalPassword,
            token,
        }).then(isSuccessful => setState(isSuccessful ? 'success' : 'request_new_password'));
    };
    return [state, handleSubmit];
};
const submitNewPassword = (apiBaseUrl, { password, token }) => fetch(`${apiBaseUrl}/admin/UpdateMyPassword`, {
    method: 'post',
    body: { password, token },
})
    .then(response => response.status >= 200 && response.status < 300)
    .catch(() => false);
const verifyNewPasswordTokenValid = (apiBaseUrl, token) => fetch(`${apiBaseUrl}/admin/passwordResetTokenValidate?token=${token}`)
    .then(response => response.json())
    .then(json => !!json)
    .catch(error => console.error(error) || false);
//# sourceMappingURL=NewPassword.js.map