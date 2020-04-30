"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ResetPasswordForm_1 = require("./ResetPasswordForm");
const ResetPasswordConfirm_1 = require("./ResetPasswordConfirm");
const useResetPassword_1 = require("../useResetPassword");
const AuthenticationLayout_1 = require("../AuthenticationLayout");
/**
 * The page displaying the reset password form
 *
 * @param {*} Header A React Component used as the page header
 * @param {*} Content A React Component used to display some content next to the reset password form
 * @param {*} Footer A React Component used as the page footer
 *
 * @example <caption>Simple usage</caption>
 * <ResetPasswordPage />
 *
 * const MyApp = props => <Admin resetPasswordPage={MyResetPasswordPage} {...props} />
 *
 * @example <caption>With customized parts</caption>
 * const Header = () => <header><h1>My company</h1></header>
 * const Footer = () => <footer>Copyright © 2020 My Company. All Rights Reserved</footer>
 * const Content = () => <section><p>Welcome to My Product.</p></section>
 *
 * const MyResetPasswordPage = props => (
 *     <ResetPasswordPage
 *         Header={CustomHeader}
 *         Content={CustomContent}
 *         Footer={CustomFooter}
 *         {...props}
 *     />
 * );
 *
 * const MyApp = props => <Admin resetPasswordPage={MyResetPasswordPage} {...props} />
 */
exports.ResetPasswordPage = props => {
    const { Layout = AuthenticationLayout_1.AuthenticationLayout } = props;
    const [username, setUsername] = useResetPassword_1.useResetPassword();
    const onSubmit = ({ username }) => {
        setUsername(username);
    };
    return (react_1.default.createElement(Layout, Object.assign({}, props), username ? (react_1.default.createElement(ResetPasswordConfirm_1.ResetPasswordConfirm, null)) : (react_1.default.createElement(ResetPasswordForm_1.ResetPasswordForm, { onSubmit: onSubmit }))));
};
//# sourceMappingURL=ResetPassword.js.map