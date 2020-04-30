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
import { Layout } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { ApiHubAppBar } from './ApiHubAppBar';
import { ApiHubSidebar } from './ApiHubSidebar';
import { ApiHubMenu } from './ApiHubMenu';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        position: 'relative',
        minWidth: 'fit-content',
        width: '100%',
    },
    appFrame: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: theme.spacing(9),
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(3),
    },
}));
/**
 * The ApiHub Layout used in the ApiHub Admin.
 *
 * @param {*} appBar The AppBar component
 * @param {*} sidebar The Sidebar component
 * @param {*} menu The Menu component
 * @param {*} rest The other Layout properties
 */
export const ApiHubLayout = (_a) => {
    var { appBar = ApiHubAppBar, sidebar = ApiHubSidebar, menu = ApiHubMenu } = _a, rest = __rest(_a, ["appBar", "sidebar", "menu"]);
    const classes = useStyles(rest);
    return (React.createElement(Layout, Object.assign({ classes: classes, appBar: appBar, sidebar: sidebar, menu: menu }, rest)));
};
//# sourceMappingURL=ApiHubLayout.js.map