import React from 'react';
import { NewPasswordPage } from 'layer7-apihub';

import { CustomLayout } from './CustomLayout';

export const CustomNewPasswordPage = props => (
    <NewPasswordPage Layout={CustomLayout} {...props} />
);
