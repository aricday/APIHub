import React from 'react';
import { useTranslate } from 'ra-core';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
    },
    subheader: {
        display: 'flex',
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.caption.fontSize,
    },
    title: {
        fontFamily: theme.typography.subtitle2.fontFamily,
        fontSize: theme.typography.subtitle2.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        wordBreak: 'break-word',
        maxWidth: 300,
        marginBottom: theme.spacing(),
    },
    enabledContainer: {
        width: 'auto',
    },
    enabled: {
        color: theme.palette.success.main,
        '& $enabledIcon': {
            backgroundColor: theme.palette.success.main,
        },
    },
    disabled: {
        '& $enabledIcon': {
            backgroundColor: theme.palette.text.disabled,
        },
    },
    enabledIcon: {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        borderRadius: 99999,
        marginRight: theme.spacing(),
    },
    divider: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        minHeight: theme.spacing(2),
    },
}));
export const ApplicationCard = ({ record }) => {
    const classes = useStyles();
    const translate = useTranslate();
    return (React.createElement(Card, { className: classes.root },
        React.createElement(CardHeader, { className: classes.header, title: React.createElement(Tooltip, { title: record.name },
                React.createElement(Typography, { variant: "h5", component: "span", display: "block", className: classes.title, noWrap: true }, record.name)), disableTypography: true, subheader: React.createElement(Grid, { container: true, alignItems: "center", className: classes.subheader },
                React.createElement(Grid, { item: true, container: true, alignItems: "center", className: classNames(classes.enabledContainer, {
                        [classes.enabled]: record.status === 'ENABLED',
                        [classes.disabled]: record.status !== 'ENABLED',
                    }) },
                    React.createElement("div", { className: classes.enabledIcon }),
                    React.createElement(Typography, { variant: "caption" }, translate(`resources.applications.status.${record.status.toLowerCase()}`)))) }),
        React.createElement(CardContent, { className: classes.content },
            React.createElement(Typography, { variant: "body1" }, translate('resources.applications.fields.apiKey', {
                apiKey: record.id,
            })),
            React.createElement(Tooltip, { title: record.id || '' },
                React.createElement(Typography, { variant: "caption" }, record.id)))));
};
//# sourceMappingURL=ApplicationCard.js.map