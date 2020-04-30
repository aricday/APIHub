import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useTranslate } from 'react-admin';

import { useClearNotifications } from '../../ui';
import { LoginForm } from './LoginForm';
import { AuthenticationLayout } from '../AuthenticationLayout';

const useStyles = makeStyles(theme => ({
    signUpTitle: {
        fontSize: theme.typography.fontSize * 2,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
}));

/**
 * The page displaying the login form
 *
 * @param {*} Header A React Component used as the page header
 * @param {*} Content A React Component used to display some content next to the login form
 * @param {*} Footer A React Component used as the page footer
 *
 * @example <caption>Simple usage</caption>
 * <LoginPage />
 *
 * const MyApp = props => <Admin loginPage={MyLogin} {...props} />
 *
 * @example <caption>With customized parts</caption>
 * const Header = () => <header><h1>My company</h1></header>
 * const Footer = () => <footer>Copyright © 2020 My Company. All Rights Reserved</footer>
 * const Content = () => <section><p>Welcome to My Product.</p></section>
 *
 * const MyLoginPage = props => (
 *     <LoginPage
 *         Header={CustomHeader}
 *         Content={CustomContent}
 *         Footer={CustomFooter}
 *         {...props}
 *     />
 * );
 *
 * const MyApp = props => <Admin loginPage={MyLogin} {...props} />
 */
export const LoginPage = props => {
    const { Layout = AuthenticationLayout } = props;

    const clearNotifications = useClearNotifications();

    useEffect(() => {
        clearNotifications();
    }, [clearNotifications]);

    // Disabled until a new API is available to get those settings
    // const {
    //     signUpEnabled,
    //     simpleCredentialsEnabled,
    // } = useAuthenticationConfiguration();
    const signUpEnabled = true;
    const simpleCredentialsEnabled = true;

    return (
        <Layout {...props}>
            {simpleCredentialsEnabled ? <LoginForm /> : null}
            {signUpEnabled ? <SignUp /> : null}
        </Layout>
    );
};

export const SignUp = props => {
    const classes = useStyles(props);
    const translate = useTranslate();

    return (
        <>
            <Typography
                variant="h2"
                className={classes.signUpTitle}
                color="textSecondary"
            >
                {translate('apihub.login.actions.sign_up_title')}
            </Typography>
            <Button
                component={Link}
                to="/signup"
                variant="outlined"
                color="primary"
                disabled
            >
                {translate('apihub.login.actions.sign_up')}
            </Button>
        </>
    );
};
