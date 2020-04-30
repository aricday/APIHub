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
export const ApiHubLayout = ({
    appBar = ApiHubAppBar,
    sidebar = ApiHubSidebar,
    menu = ApiHubMenu,
    ...rest
}) => {
    const classes = useStyles(rest);

    return (
        <Layout
            classes={classes}
            appBar={appBar}
            sidebar={sidebar}
            menu={menu}
            {...rest}
        />
    );
};
