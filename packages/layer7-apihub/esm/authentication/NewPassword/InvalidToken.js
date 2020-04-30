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
export const InvalidToken = props => {
    const translate = useTranslate();
    const classes = useStyles(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1", className: classes.root }, translate('apihub.new_password.validation.invalid_token')),
        React.createElement(Button, { color: "primary", variant: "contained", component: Link, to: "/login" }, translate('apihub.new_password.actions.open_login_page'))));
};
//# sourceMappingURL=InvalidToken.js.map