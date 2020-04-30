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
import React, { cloneElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { HideOnScroll, LoadingIndicator, useLocale } from 'react-admin';
import { ApiHubUserMenu } from './ApiHubUserMenu';
import { ApiHubLanguageSwitcher } from './ApiHubLanguageSwitcher';
import { SidebarButton } from './SidebarButton';
const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24,
    },
    header: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        minWidth: '156px',
    },
    divider: {
        alignSelf: 'stretch',
        backgroundColor: theme.palette.primary.contrastText,
        height: 'auto',
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(2),
    },
}), { name: 'RaAppBar' });
/**
 * The ApiHub AppBar used in the ApiHub Layout.
 *
 * @param {*} props AppBar properties
 */
export const ApiHubAppBar = (_a) => {
    var { children, classes: classesOverride, className, languagesMenu, logo, logout, open, sidebarButton, title, userMenu } = _a, rest = __rest(_a, ["children", "classes", "className", "languagesMenu", "logo", "logout", "open", "sidebarButton", "title", "userMenu"]);
    const classes = useStyles({ classes: classesOverride });
    useLocale(); // Make sure the locale change would rerender the component
    return (React.createElement(HideOnScroll, null,
        React.createElement(AppBar, Object.assign({ className: className, color: "secondary", elevation: 0 }, rest),
            React.createElement(Toolbar, { disableGutters: true, variant: "regular", className: classes.toolbar },
                cloneElement(sidebarButton, { open }),
                React.createElement("div", { className: classes.header }, children),
                React.createElement(LoadingIndicator, null),
                cloneElement(languagesMenu),
                React.createElement(Divider, { className: classes.divider, orientation: "vertical" }),
                cloneElement(userMenu, { logout })))));
};
ApiHubAppBar.defaultProps = {
    userMenu: React.createElement(ApiHubUserMenu, null),
    languagesMenu: React.createElement(ApiHubLanguageSwitcher, null),
    sidebarButton: React.createElement(SidebarButton, null),
};
//# sourceMappingURL=ApiHubAppBar.js.map