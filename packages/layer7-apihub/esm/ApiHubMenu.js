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
import { MenuItemLink } from 'react-admin';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { useTranslate } from 'ra-core';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { IconHome, IconApi, IconApps } from './ui/icons';
const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
}, { name: 'RaMenu' });
/**
 * The ApiHub Menu used in the ApiHub Sidebar.
 *
 * Inspired by https://github.com/marmelab/react-admin/blob/2c167a4693b4ca060f72b272f19e9af8f41eb091/packages/ra-ui-materialui/src/layout/Menu.tsx
 *
 * @param {*} props Menu properties
 */
export const ApiHubMenu = props => {
    const { classes: classesOverride, className, dense, hasDashboard, onMenuClick = () => null, logout } = props, rest = __rest(props, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "logout"]);
    const translate = useTranslate();
    const classes = useStyles(props);
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    // Used to force redraw on navigation
    useSelector(state => state.router.location.pathname);
    return (React.createElement("div", Object.assign({ className: classnames(classes.main, className) }, rest),
        hasDashboard && (React.createElement(MenuItemLink, Object.assign({ onClick: onMenuClick, to: "/", exact: true, primaryText: translate('ra.page.dashboard'), leftIcon: React.createElement(IconHome, null), dense: dense, sidebarIsOpen: open }, props))),
        React.createElement(MenuItemLink, { key: "apis", to: "/apis", primaryText: translate(`resources.apis.name`, {
                smart_count: 2,
            }), leftIcon: React.createElement(IconApi, null), onClick: onMenuClick, dense: dense, sidebarIsOpen: open }),
        React.createElement(MenuItemLink, { key: "applications", to: "/applications", primaryText: translate(`resources.applications.name`, {
                smart_count: 2,
            }), leftIcon: React.createElement(IconApps, null), onClick: onMenuClick, dense: dense, sidebarIsOpen: open }),
        isXSmall && logout));
};
//# sourceMappingURL=ApiHubMenu.js.map