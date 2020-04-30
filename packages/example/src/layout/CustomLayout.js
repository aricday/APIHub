import React, { useMemo } from 'react';
import { ApiHubLayout } from 'layer7-apihub';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../theme';

import { CustomAppBar } from './CustomAppBar';

export const CustomLayout = props => {
    const themeMode = useSelector(state => state.theme);

    const theme = useMemo(
        () => (themeMode === 'dark' ? darkTheme : lightTheme),
        [themeMode]
    );

    return <ApiHubLayout appBar={CustomAppBar} {...props} theme={theme} />;
};
