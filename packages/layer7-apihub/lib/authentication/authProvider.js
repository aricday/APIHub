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
Object.defineProperty(exports, "__esModule", { value: true });
const credentialsAuthProvider_1 = require("./credentialsAuthProvider");
const AUTH_PROVIDER_LOGIN_SCHEME = 'auth-login-scheme';
exports.authProvider = (baseUrl, tenantName) => {
    const adminUrl = `${baseUrl}/admin`;
    const apiUrl = `${baseUrl}/api/${tenantName}`;
    const providers = {
        credentials: credentialsAuthProvider_1.credentialsAuthProvider(apiUrl, adminUrl),
    };
    let schemeUsedForLogin = null;
    const getSchemeUsedForLogin = () => {
        if (!schemeUsedForLogin) {
            schemeUsedForLogin = localStorage.getItem(AUTH_PROVIDER_LOGIN_SCHEME);
        }
        return schemeUsedForLogin;
    };
    const setSchemeUsedForLogin = scheme => {
        localStorage.setItem(AUTH_PROVIDER_LOGIN_SCHEME, scheme);
    };
    const getProviderUsedForLogin = () => {
        const scheme = getSchemeUsedForLogin();
        return providers[scheme];
    };
    return {
        login: async (_a) => {
            var { scheme } = _a, params = __rest(_a, ["scheme"]);
            setSchemeUsedForLogin(scheme);
            const authProviderUsedForLogin = getProviderUsedForLogin();
            if (!authProviderUsedForLogin) {
                throw new Error(`Unknown authentication scheme ${scheme}`);
            }
            return authProviderUsedForLogin.login(params);
        },
        logout: () => {
            const authProviderUsedForLogin = getProviderUsedForLogin();
            if (authProviderUsedForLogin) {
                return authProviderUsedForLogin.logout();
            }
            return Promise.resolve();
        },
        checkAuth: () => {
            const authProviderUsedForLogin = getProviderUsedForLogin();
            if (authProviderUsedForLogin) {
                return authProviderUsedForLogin.checkAuth();
            }
            return Promise.resolve();
        },
        checkError: error => {
            const status = error.status;
            if (!status) {
                // TypeError: Network request failed
                return Promise.reject(error);
            }
            switch (error.status) {
                case 401: // Unauthorized
                case 500: // Internal Server Error
                    return Promise.reject(error);
                default:
                    return Promise.resolve();
            }
        },
        getPermissions: async () => {
            const authProviderUsedForLogin = getProviderUsedForLogin();
            if (authProviderUsedForLogin) {
                return authProviderUsedForLogin.getPermissions();
            }
            return Promise.resolve();
        },
    };
};
//# sourceMappingURL=authProvider.js.map