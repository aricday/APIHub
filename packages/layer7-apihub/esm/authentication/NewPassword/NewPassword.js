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
import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useTranslate } from 'ra-core';
import { useApiHub } from '../../ApiHubContext';
import { extractTokenFromUrl } from '../extractTokenFromUrl';
import { NewPasswordForm } from './NewPasswordForm';
import { VerifyingToken } from './VerifyingToken';
import { InvalidToken } from './InvalidToken';
import { Success } from './Success';
import { AuthenticationLayout } from '../AuthenticationLayout';
import { usePasswordEncryption } from '../usePasswordEncryption';
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
export const NewPasswordPage = (_a) => {
    var { location, Layout = AuthenticationLayout } = _a, props = __rest(_a, ["location", "Layout"]);
    const [state, handleSubmit] = useSetNewPassword(location);
    const translate = useTranslate();
    const classes = useStyles(props);
    return (React.createElement(Layout, Object.assign({}, props), state === 'verifying_token' ? (React.createElement(VerifyingToken, null)) : state === 'request_new_password' ? (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h2", className: classes.title }, translate('apihub.new_password.title')),
        React.createElement(NewPasswordForm, { onSubmit: handleSubmit, variant: "outlined" }))) : state === 'invalid_token' ? (React.createElement(InvalidToken, null)) : state === 'success' ? (React.createElement(Success, null)) : null));
};
const useStyles = makeStyles(theme => ({
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
    const [state, setState] = useState('verifying_token');
    const { url } = useApiHub();
    const token = extractTokenFromUrl(location.hash);
    const [publicKey, encrypt] = usePasswordEncryption();
    useEffect(() => {
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