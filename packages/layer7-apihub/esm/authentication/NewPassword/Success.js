import React from 'react';
import { useTranslate } from 'ra-core';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.success.main,
        marginBottom: theme.spacing(),
    },
}));
export const Success = props => {
    const translate = useTranslate();
    const classes = useStyles(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1", className: classes.root }, translate('apihub.new_password.notifications.confirmation')),
        React.createElement(Button, { color: "primary", variant: "contained", component: Link, to: "/login" }, translate('apihub.new_password.actions.open_login_page'))));
};
//# sourceMappingURL=Success.js.map