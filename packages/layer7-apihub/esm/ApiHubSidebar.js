import React from 'react';
import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
const useSidebarStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
    },
}));
/**
 * The ApiHub Sidebar used in the ApiHub Layout.
 *
 * @param {*} rest Sidebar properties
 */
export const ApiHubSidebar = props => {
    const classes = useSidebarStyles();
    return React.createElement(Sidebar, Object.assign({ className: classes.root }, props));
};
//# sourceMappingURL=ApiHubSidebar.js.map