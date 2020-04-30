import React from 'react';
import { ResetPasswordPage } from 'layer7-apihub';

import { CustomLayout } from './CustomLayout';

export const CustomResetPasswordPage = props => (
    <ResetPasswordPage Layout={CustomLayout} {...props} />
);
