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
import React from 'react';
import { AuthenticationLayout } from '../AuthenticationLayout';
import { AccountSetupForm } from './AccountSetupForm';
import { useAccountData } from './useAccountData';
import { PreparingForm } from './PreparingForm';
import { InvalidRequest } from './InvalidRequest';
import { SetupSucceeded } from './SetupSucceeded';
/**
 * The page displaying the account setup form
 *
 * @param {*} Header A React Component used as the page header
 * @param {*} Content A React Component used to display some content next to the account setup form
 * @param {*} Footer A React Component used as the page footer
 *
 * @example <caption>Simple usage</caption>
 * <AccountSetupPage />
 *
 * const MyApp = props => <Admin accountSetupPage={MyAccountSetupPage} {...props} />
 *
 * @example <caption>With customized parts</caption>
 * const Header = () => <header><h1>My company</h1></header>
 * const Content = () => <section><p>Welcome to My Product.</p></section>
 * const Footer = () => <footer>Copyright © 2020 My Company. All Rights Reserved</footer>
 *
 * const AccountSetupPagePage = props => (
 *     <AccountSetupPage
 *         Header={CustomHeader}
 *         Content={CustomContent}
 *         Footer={CustomFooter}
 *         {...props}
 *     />
 * );
 *
 * const MyApp = props => <Admin accountSetupPage={MyAccountSetupPage} {...props} />
 */
export const AccountSetupPage = (_a) => {
    var { location, Layout = AuthenticationLayout } = _a, props = __rest(_a, ["location", "Layout"]);
    const [state, accountData, submitAccountData] = useAccountData(location);
    const handleSubmit = data => {
        submitAccountData(data);
    };
    return (React.createElement(Layout, Object.assign({}, props), state === 'prepare' ? (React.createElement(PreparingForm, null)) : state === 'fill' ? (React.createElement(AccountSetupForm, { initialValues: accountData, onSubmit: handleSubmit })) : state === 'invalid_request' ? (React.createElement(InvalidRequest, null)) : state === 'success' ? (React.createElement(SetupSucceeded, null)) : null));
};
//# sourceMappingURL=AccountSetup.js.map