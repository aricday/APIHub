import React from 'react';
import { useTranslate } from 'ra-core';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));
export const InvalidRequest = () => {
    const translate = useTranslate();
    const classes = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1", className: classes.root }, translate('apihub.account_setup.notifications.invalid_request')),
        React.createElement(Button, { color: "primary", variant: "contained", component: Link, to: "/login" }, translate('apihub.account_setup.actions.open_login_page'))));
};
//# sourceMappingURL=InvalidRequest.js.map