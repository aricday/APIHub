import React, { useState } from 'react';
import { PasswordInput, required, SimpleForm, TextInput, useLogin, useTranslate, } from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Link, Typography } from '@material-ui/core';
import { LoginToolbar } from './LoginToolbar';
const useStyles = makeStyles(theme => ({
    form: {
        '& >:first-child': {
            padding: 0,
        },
    },
    title: {
        fontSize: theme.typography.fontSize * 2,
        marginBottom: theme.spacing(6),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
}));
export const LoginForm = props => {
    const login = useLogin();
    const classes = useStyles(props);
    const translate = useTranslate();
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const submit = async ({ username, password }) => {
        setError(null);
        setIsLoading(true);
        try {
            await login({ scheme: 'credentials', username, password });
        }
        catch (_a) {
            setError('apihub.login.notifications.invalid_credentials');
        }
        setIsLoading(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h2", className: classes.title }, translate('apihub.login.title')),
        React.createElement(SimpleForm, { className: classes.form, save: submit, toolbar: React.createElement(LoginToolbar, { loading: isLoading, error: error }) },
            React.createElement(TextInput, { source: "username", type: "text", label: "apihub.login.fields.username", variant: "outlined", fullWidth: true, validate: required() }),
            React.createElement(PasswordInput, { source: "password", label: "apihub.login.fields.password", variant: "outlined", fullWidth: true, validate: required() })),
        React.createElement(Typography, { variant: "body1" },
            React.createElement(Link, { component: RouterLink, to: "/reset-password" }, translate('apihub.login.actions.forgot_password')))));
};
//# sourceMappingURL=LoginForm.js.map