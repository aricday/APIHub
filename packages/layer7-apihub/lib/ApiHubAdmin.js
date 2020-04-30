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
const react_admin_1 = require("react-admin");
const react_router_1 = require("react-router");
const styles_1 = require("@material-ui/core/styles");
const merge_1 = __importDefault(require("lodash/fp/merge"));
const ApiHubContext_1 = require("./ApiHubContext");
const authentication_1 = require("./authentication");
const dataProvider_1 = require("./dataProvider");
const i18n_1 = require("./i18n");
const authentication_2 = require("./authentication");
const homepage_1 = require("./homepage");
const apis_1 = require("./apis");
const applications_1 = require("./applications");
const userContexts_1 = require("./userContexts");
const ApiHubLayout_1 = require("./ApiHubLayout");
const preferences_1 = require("./preferences");
const theme_1 = require("./theme");
const documentationReducer_1 = require("./apis/Documentation/documentationReducer");
exports.ApiHubAdmin = (_a) => {
    var { 
    // ApiHub Settings
    url = ApiHubContext_1.guessApihubUrl(), tenantName = ApiHubContext_1.guessApihubTenantName(), useSameOrigin = true, 
    // Custom Pages and Layout
    dashboard = homepage_1.HomePageContent, layout = ApiHubLayout_1.ApiHubLayout, loginPage = authentication_2.LoginPage, resetPasswordPage = authentication_2.ResetPasswordPage, newPasswordPage = authentication_2.NewPasswordPage, accountSetupPage = authentication_2.AccountSetupPage, 
    // React Admin Settings
    customReducers } = _a, props = __rest(_a, ["url", "tenantName", "useSameOrigin", "dashboard", "layout", "loginPage", "resetPasswordPage", "newPasswordPage", "accountSetupPage", "customReducers"]);
    const defaultLocaleFromPreferences = preferences_1.readApiHubPreference('locale', i18n_1.defaultLocale);
    return (react_1.default.createElement(ApiHubContext_1.ApiHubProvider, { url: url, tenantName: tenantName },
        react_1.default.createElement(react_admin_1.Admin, Object.assign({ authProvider: authentication_1.authProvider(url, tenantName), dataProvider: dataProvider_1.dataProvider(url, tenantName), i18nProvider: i18n_1.i18nProvider(defaultLocaleFromPreferences), theme: styles_1.createMuiTheme(theme_1.theme), layout: layout, loginPage: loginPage, dashboard: dashboard, customRoutes: [
                react_1.default.createElement(react_router_1.Route, { path: "/reset-password", component: resetPasswordPage, noLayout: true }),
                react_1.default.createElement(react_router_1.Route, { path: "/new-password", component: newPasswordPage, noLayout: true }),
                react_1.default.createElement(react_router_1.Route, { path: "/account-setup", component: accountSetupPage, noLayout: true }),
            ], customReducers: merge_1.default(documentationReducer_1.documentationReducer, customReducers) }, props),
            react_1.default.createElement(react_admin_1.Resource, Object.assign({ name: "apis" }, apis_1.apis)),
            react_1.default.createElement(react_admin_1.Resource, Object.assign({ name: "applications" }, applications_1.applications)),
            react_1.default.createElement(react_admin_1.Resource, { name: "assets" }),
            react_1.default.createElement(react_admin_1.Resource, { name: "specs" }),
            react_1.default.createElement(react_admin_1.Resource, { name: "tags" }),
            react_1.default.createElement(react_admin_1.Resource, { name: "documents" }),
            react_1.default.createElement(react_admin_1.Resource, Object.assign({ name: "userContexts" }, userContexts_1.userContexts)))));
};
//# sourceMappingURL=ApiHubAdmin.js.map