var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme as defaultTheme } from '../theme';
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    columns: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
        '&:first-child': {
            minWidth: '250px',
            maxWidth: '30%',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '100%',
                width: '100%',
            },
        },
        '&:not(:first-child)': {
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            borderWidth: '0px 0px 0px 1px',
            marginLeft: theme.spacing(4),
            maxWidth: `calc(50% - ${theme.spacing(4)}px)`,
            [theme.breakpoints.down('sm')]: {
                borderWidth: '1px 0px 0px 0px',
                marginLeft: '0px',
                maxWidth: '100%',
                width: '100%',
            },
        },
        '&:last-child': {
            flexGrow: 1,
        },
    },
}));
// This component exists for theming only. Indeed, we must call the useStyles hook AFTER
// the ThemeProvider has been initialized with the specified theme
const ThemedAuthenticationLayout = ({ children, Header, Content, Footer }) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        Header ? React.createElement(Header, null) : null,
        React.createElement("div", { className: classes.container },
            React.createElement("div", { className: classes.columns }, children),
            Content ? (React.createElement("div", { className: classes.columns },
                React.createElement(Content, null))) : null),
        Footer ? React.createElement(Footer, null) : null));
};
/**
 * The page displaying the account setup form
 *
 * @param {*} Header A React Component used as the page header
 * @param {*} Content A React Component used to display some content next to the account setup form
 * @param {*} Footer A React Component used as the page footer
 *
 * @example <caption>Simple usage</caption>
 * <AccountSetupPage />
 *
 * const MyApp = props => <Admin accountSetupPage={MyAccountSetupPage} {...props} />
 *
 * @example <caption>With customized parts</caption>
 * const Header = () => <header><h1>My company</h1></header>
 * const Content = () => <section><p>Welcome to My Product.</p></section>
 * const Footer = () => <footer>Copyright © 2020 My Company. All Rights Reserved</footer>
 *
 * const AccountSetupPagePage = props => (
 *     <AccountSetupPage
 *         Header={CustomHeader}
 *         Content={CustomContent}
 *         Footer={CustomFooter}
 *         {...props}
 *     />
 * );
 *
 * const MyApp = props => <Admin accountSetupPage={MyAccountSetupPage} {...props} />
 */
export const AuthenticationLayout = (_a) => {
    var { theme = defaultTheme } = _a, props = __rest(_a, ["theme"]);
    return (React.createElement(ThemeProvider, { theme: createMuiTheme(theme) },
        React.createElement(ThemedAuthenticationLayout, Object.assign({}, props))));
};
//# sourceMappingURL=AuthenticationLayout.js.map