import React from 'react';
import { LoginPage } from 'layer7-apihub';

import { CustomLayout } from './CustomLayout';

export const CustomLoginPage = props => (
    <LoginPage Layout={CustomLayout} {...props} />
);
