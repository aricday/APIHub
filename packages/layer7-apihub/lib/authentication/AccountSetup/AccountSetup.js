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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AuthenticationLayout_1 = require("../AuthenticationLayout");
const AccountSetupForm_1 = require("./AccountSetupForm");
const useAccountData_1 = require("./useAccountData");
const PreparingForm_1 = require("./PreparingForm");
const InvalidRequest_1 = require("./InvalidRequest");
const SetupSucceeded_1 = require("./SetupSucceeded");
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
exports.AccountSetupPage = (_a) => {
    var { location, Layout = AuthenticationLayout_1.AuthenticationLayout } = _a, props = __rest(_a, ["location", "Layout"]);
    const [state, accountData, submitAccountData] = useAccountData_1.useAccountData(location);
    const handleSubmit = data => {
        submitAccountData(data);
    };
    return (react_1.default.createElement(Layout, Object.assign({}, props), state === 'prepare' ? (react_1.default.createElement(PreparingForm_1.PreparingForm, null)) : state === 'fill' ? (react_1.default.createElement(AccountSetupForm_1.AccountSetupForm, { initialValues: accountData, onSubmit: handleSubmit })) : state === 'invalid_request' ? (react_1.default.createElement(InvalidRequest_1.InvalidRequest, null)) : state === 'success' ? (react_1.default.createElement(SetupSucceeded_1.SetupSucceeded, null)) : null));
};
//# sourceMappingURL=AccountSetup.js.map