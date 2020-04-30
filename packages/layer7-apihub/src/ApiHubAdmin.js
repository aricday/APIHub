import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import merge from 'lodash/fp/merge';

import {
    ApiHubProvider,
    guessApihubUrl,
    guessApihubTenantName,
} from './ApiHubContext';
import { authProvider } from './authentication';
import { dataProvider } from './dataProvider';
import { i18nProvider, defaultLocale } from './i18n';
import {
    LoginPage,
    NewPasswordPage,
    ResetPasswordPage,
    AccountSetupPage,
} from './authentication';
import { HomePageContent } from './homepage';
import { apis } from './apis';
import { applications } from './applications';
import { userContexts } from './userContexts';
import { ApiHubLayout } from './ApiHubLayout';

import { readApiHubPreference } from './preferences';
import { theme } from './theme';

import { documentationReducer } from './apis/Documentation/documentationReducer';

export const ApiHubAdmin = ({
    // ApiHub Settings
    url = guessApihubUrl(),
    tenantName = guessApihubTenantName(),
    useSameOrigin = true,
    // Custom Pages and Layout
    dashboard = HomePageContent,
    layout = ApiHubLayout,
    loginPage = LoginPage,
    resetPasswordPage = ResetPasswordPage,
    newPasswordPage = NewPasswordPage,
    accountSetupPage = AccountSetupPage,
    // React Admin Settings
    customReducers,
    ...props
}) => {
    const defaultLocaleFromPreferences = readApiHubPreference(
        'locale',
        defaultLocale
    );

    return (
        <ApiHubProvider url={url} tenantName={tenantName}>
            <Admin
                authProvider={authProvider(url, tenantName)}
                dataProvider={dataProvider(url, tenantName)}
                i18nProvider={i18nProvider(defaultLocaleFromPreferences)}
                theme={createMuiTheme(theme)}
                layout={layout}
                loginPage={loginPage}
                dashboard={dashboard}
                customRoutes={[
                    <Route
                        path="/reset-password"
                        component={resetPasswordPage}
                        noLayout
                    />,
                    <Route
                        path="/new-password"
                        component={newPasswordPage}
                        noLayout
                    />,
                    <Route
                        path="/account-setup"
                        component={accountSetupPage}
                        noLayout
                    />,
                ]}
                customReducers={merge(documentationReducer, customReducers)}
                {...props}
            >
                <Resource name="apis" {...apis} />
                <Resource name="applications" {...applications} />
                <Resource name="assets" />
                <Resource name="specs" />
                <Resource name="tags" />
                <Resource name="documents" />
                <Resource name="userContexts" {...userContexts} />
            </Admin>
        </ApiHubProvider>
    );
};
