import React from 'react';
import { AccountSetupPage } from 'layer7-apihub';

import { CustomLayout } from './CustomLayout';

export const CustomAccountSetupPage = props => (
    <AccountSetupPage Layout={CustomLayout} {...props} />
);
