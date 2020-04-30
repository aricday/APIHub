import React from 'react';
import { AuthenticationLayout } from 'layer7-apihub';
import { useSelector } from 'react-redux';

import { lightTheme, darkTheme } from '../theme';
import { CustomHeader } from '../ui/CustomHeader';
import { CustomContent } from './CustomContent';
import { CustomFooter } from '../ui/CustomFooter';

export const CustomLayout = props => {
    const theme = useSelector(state => state.theme);
    return (
        <AuthenticationLayout
            Header={CustomHeader}
            Content={CustomContent}
            Footer={CustomFooter}
            {...props}
            theme={theme === 'light' ? lightTheme : darkTheme}
        />
    );
};
