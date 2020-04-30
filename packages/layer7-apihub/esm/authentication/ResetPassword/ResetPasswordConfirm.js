import React from 'react';
import { useTranslate } from 'react-admin';
import { makeStyles, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
    form: {
        '& >:first-child': {
            padding: 0,
        },
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginBottom: theme.spacing(6),
    },
    instructions: {
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightBold,
    },
    description: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(6),
    },
    link: {
        display: 'flex',
        alignItems: 'center',
    },
}));
export const ResetPasswordConfirm = props => {
    const classes = useStyles(props);
    const translate = useTranslate();
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h2", className: classes.title }, translate('apihub.reset_password_confirm.title')),
        React.createElement(Typography, { variant: "subtitle1", className: classes.instructions }, translate('apihub.reset_password_confirm.form_details.instructions')),
        React.createElement(Typography, { variant: "subtitle2", className: classes.description }, translate('apihub.reset_password_confirm.form_details.description')),
        React.createElement(Typography, { variant: "body1" },
            React.createElement(Link, { component: RouterLink, to: "/login", className: classes.link },
                React.createElement(ChevronRightIcon, null),
                translate('apihub.reset_password_confirm.actions.open_login_page')))));
};
//# sourceMappingURL=ResetPasswordConfirm.js.map