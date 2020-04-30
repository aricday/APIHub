import React from 'react';
import { ApiHubAdmin, readApiHubPreference } from 'layer7-apihub';
import { Helmet } from 'react-helmet';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
    CustomLoginPage,
    CustomResetPasswordPage,
    CustomNewPasswordPage,
    CustomAccountSetupPage,
} from './authentication';

import { CustomLayout } from './layout';
import { themeReducer } from './theme';
import { i18nProvider } from './i18n/i18nProvider';
import { CustomHomePage } from './layout/CustomHomePage';

const App = () => {
    const { PAGE_TITLE, APIHUB_URL, TENANT_NAME } = global.APIHUB_CONFIG;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const themeModePreference = readApiHubPreference(
        'themeMode',
        prefersDarkMode ? 'dark' : 'light'
    );

    const initialState = {
        theme: themeModePreference,
    };

    return (
        <>
            <Helmet>
                <title>{PAGE_TITLE}</title>
            </Helmet>
            <ApiHubAdmin
                url={APIHUB_URL} // Will be guessed by ApiHubAdmin if not defined
                tenantName={TENANT_NAME} // Will be guessed by ApiHubAdmin if not defined
                layout={CustomLayout}
                dashboard={CustomHomePage}
                loginPage={CustomLoginPage}
                resetPasswordPage={CustomResetPasswordPage}
                newPasswordPage={CustomNewPasswordPage}
                accountSetupPage={CustomAccountSetupPage}
                initialState={initialState}
                customReducers={{ theme: themeReducer }}
                i18nProvider={i18nProvider()}
            />
        </>
    );
};

export default App;
