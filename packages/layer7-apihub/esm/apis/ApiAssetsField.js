import React, { forwardRef } from 'react';
import { useTranslate, useGetManyReference } from 'ra-core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import { useApiHub } from '../ApiHubContext';
const useStyles = makeStyles(theme => ({
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));
const DownloadButton = forwardRef((props, ref) => (React.createElement(Button, Object.assign({ variant: "outlined", color: "primary", ref: ref }, props))));
const DownloadFilesButton = ({ id }) => {
    const translate = useTranslate();
    const { urlWithTenant } = useApiHub();
    const href = `${urlWithTenant}/api-management/1.0/apis/${id}/assets/archive`;
    const label = translate('resources.apis.overview.actions.download_assets');
    return (React.createElement(Link, { component: DownloadButton, href: href, download: "assets.zip", "aria-label": label }, label));
};
export const ApiAssetsField = ({ id }) => {
    const translate = useTranslate();
    const classes = useStyles();
    const { data, loaded, error } = useGetManyReference('assets', 'id', id, undefined, undefined, undefined, 'apis');
    if (!loaded) {
        return React.createElement(LinearProgress, null);
    }
    if (error) {
        return (React.createElement(Typography, { variant: "body1", className: classes.error }, translate('ra.page.error')));
    }
    if (!data) {
        return (React.createElement(Typography, { variant: "body1" }, translate('resources.apis.overview.notifications.no_assets')));
    }
    const links = Object.keys(data).map(key => {
        const { id, name, type, links } = data[key];
        return {
            id,
            name,
            type: type,
            href: get(links, '[0].href', null),
            rel: get(links, '[0].rel', null),
        };
    });
    return React.createElement(AssetsList, { id: id, links: links });
};
export const AssetsList = ({ id, links }) => {
    const { urlWithTenant } = useApiHub();
    return (React.createElement(React.Fragment, null,
        React.createElement(List, null, links.length > 0 &&
            links.map(link => (React.createElement(ListItem, { key: link.id, disableGutters: true },
                React.createElement(Link, { type: link.type, href: `${urlWithTenant}${link.href}`, download: link.name }, link.name))))),
        links.length > 1 ? React.createElement(DownloadFilesButton, { id: id }) : null));
};
//# sourceMappingURL=ApiAssetsField.js.map