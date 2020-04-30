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
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import merge from 'lodash/fp/merge';
import { ApiHubProvider, guessApihubUrl, guessApihubTenantName, } from './ApiHubContext';
import { authProvider } from './authentication';
import { dataProvider } from './dataProvider';
import { i18nProvider, defaultLocale } from './i18n';
import { LoginPage, NewPasswordPage, ResetPasswordPage, AccountSetupPage, } from './authentication';
import { HomePageContent } from './homepage';
import { apis } from './apis';
import { applications } from './applications';
import { userContexts } from './userContexts';
import { ApiHubLayout } from './ApiHubLayout';
import { readApiHubPreference } from './preferences';
import { theme } from './theme';
import { documentationReducer } from './apis/Documentation/documentationReducer';
export const ApiHubAdmin = (_a) => {
    var { 
    // ApiHub Settings
    url = guessApihubUrl(), tenantName = guessApihubTenantName(), useSameOrigin = true, 
    // Custom Pages and Layout
    dashboard = HomePageContent, layout = ApiHubLayout, loginPage = LoginPage, resetPasswordPage = ResetPasswordPage, newPasswordPage = NewPasswordPage, accountSetupPage = AccountSetupPage, 
    // React Admin Settings
    customReducers } = _a, props = __rest(_a, ["url", "tenantName", "useSameOrigin", "dashboard", "layout", "loginPage", "resetPasswordPage", "newPasswordPage", "accountSetupPage", "customReducers"]);
    const defaultLocaleFromPreferences = readApiHubPreference('locale', defaultLocale);
    return (React.createElement(ApiHubProvider, { url: url, tenantName: tenantName },
        React.createElement(Admin, Object.assign({ authProvider: authProvider(url, tenantName), dataProvider: dataProvider(url, tenantName), i18nProvider: i18nProvider(defaultLocaleFromPreferences), theme: createMuiTheme(theme), layout: layout, loginPage: loginPage, dashboard: dashboard, customRoutes: [
                React.createElement(Route, { path: "/reset-password", component: resetPasswordPage, noLayout: true }),
                React.createElement(Route, { path: "/new-password", component: newPasswordPage, noLayout: true }),
                React.createElement(Route, { path: "/account-setup", component: accountSetupPage, noLayout: true }),
            ], customReducers: merge(documentationReducer, customReducers) }, props),
            React.createElement(Resource, Object.assign({ name: "apis" }, apis)),
            React.createElement(Resource, Object.assign({ name: "applications" }, applications)),
            React.createElement(Resource, { name: "assets" }),
            React.createElement(Resource, { name: "specs" }),
            React.createElement(Resource, { name: "tags" }),
            React.createElement(Resource, { name: "documents" }),
            React.createElement(Resource, Object.assign({ name: "userContexts" }, userContexts)))));
};
//# sourceMappingURL=ApiHubAdmin.js.map