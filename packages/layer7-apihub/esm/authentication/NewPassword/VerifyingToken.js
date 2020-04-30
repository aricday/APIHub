import React from 'react';
import { useTranslate } from 'ra-core';
import { Typography, LinearProgress, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(),
    },
}));
export const VerifyingToken = props => {
    const translate = useTranslate();
    const classes = useStyles(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1", className: classes.root }, translate('apihub.new_password.notifications.verifying_token')),
        React.createElement(LinearProgress, null)));
};
//# sourceMappingURL=VerifyingToken.js.map