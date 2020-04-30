import React from 'react';
import { useTranslate, linkToRecord } from 'ra-core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import TimeIcon from '@material-ui/icons/AccessTime';
import EventIcon from '@material-ui/icons/Event';
import format from 'date-fns/format';
import { MarkdownView, Stats, StatsText } from '../ui';
import { TagsField } from './TagsField';
const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        textDecoration: 'none',
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
    footer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 0,
    },
    description: {
        flex: 1,
        overflow: 'hidden',
        // NOTE: We use some deprecated CSS props here but they are still well supported.
        // Besides, a new draft specification exists https://www.w3.org/TR/css-overflow-3/#propdef--webkit-line-clamp
        lineClamp: 3,
        boxOrient: 'vertical',
        display: '-webkit-box',
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
        maxWidth: '100%',
        marginBottom: theme.spacing(),
    },
    enabledContainer: {
        display: 'flex',
        alignItems: 'center',
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
    ssgServiceType: {
        fontWeight: theme.typography.fontWeightBold,
    },
    divider: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        minHeight: theme.spacing(2),
    },
    contentDivider: {
        width: '100%',
        marginBottom: theme.spacing(),
        marginTop: 0,
    },
    stats: {
        marginTop: 'auto',
    },
    tags: {
        minHeight: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    tag: {
        borderRadius: theme.spacing(0.5),
        fontWeight: theme.typography.fontWeightBold,
        '& + &': {
            marginLeft: theme.spacing(0.5),
        },
    },
}));
export const ApiCard = ({ basePath, record }) => {
    const classes = useStyles();
    const translate = useTranslate();
    const formattedDate = record ? format(record.modifyTs, 'P') : '';
    return (React.createElement(Card, { className: classes.root, component: Link, to: linkToRecord(basePath, record && record.id, 'show') },
        React.createElement(ApiCardHeader, { className: classes.header, title: React.createElement(Tooltip, { title: record.name },
                React.createElement(Typography, { variant: "h5", component: "span", display: "block", className: classes.title, noWrap: true }, record.name)), disableTypography: true, subheader: React.createElement(React.Fragment, null,
                React.createElement("div", { className: classes.subheader },
                    React.createElement("div", { className: classNames(classes.enabledContainer, {
                            [classes.enabled]: record.portalStatus === 'ENABLED',
                            [classes.disabled]: record.portalStatus !== 'ENABLED',
                        }) },
                        React.createElement("div", { className: classes.enabledIcon }),
                        React.createElement(Typography, { variant: "caption" }, translate(`resources.apis.portalStatus.${record.portalStatus.toLowerCase()}`))),
                    React.createElement(Divider, { orientation: "vertical", className: classes.divider }),
                    React.createElement(Typography, { variant: "caption", color: "textSecondary", className: classes.ssgServiceType }, record.ssgServiceType),
                    React.createElement(Divider, { orientation: "vertical", className: classes.divider }),
                    React.createElement(Tooltip, { title: record.version },
                        React.createElement(Typography, { variant: "caption", color: "textSecondary", noWrap: true }, translate('resources.apis.list.cards.fields.version', {
                            version: record.version,
                        }))))) }),
        React.createElement(CardContent, { className: classes.content },
            React.createElement(Tooltip, { title: record.description || '' },
                React.createElement(MarkdownView, { className: classes.description, value: record.description }))),
        React.createElement(CardActions, { className: classes.footer },
            React.createElement(Divider, { variant: "middle", className: classes.contentDivider }),
            React.createElement(Grid, { container: true, alignItems: "center", className: classes.tags },
                React.createElement(TagsField, { record: record, source: "tags", className: classes.tag })),
            React.createElement(Grid, { container: true, alignItems: "center", className: classes.stats },
                React.createElement(Grid, { item: true },
                    React.createElement(Stats, { icon: React.createElement(AppsIcon, null), title: translate('resources.apis.list.cards.fields.applications_long', {
                            smart_count: record.applicationUsage || 0,
                        }) },
                        React.createElement(StatsText, null, translate('resources.apis.list.cards.fields.applications', {
                            smart_count: record.applicationUsage || 0,
                        })))),
                React.createElement(Grid, { item: true },
                    React.createElement(Stats, { icon: React.createElement(TimeIcon, null), title: translate('resources.apis.list.cards.fields.averageLatency_long', {
                            smart_count: record.averageLatency || 0,
                        }) },
                        React.createElement(StatsText, null, translate('resources.apis.list.cards.fields.averageLatency', {
                            ms: record.averageLatency || 0,
                        })))),
                React.createElement(Grid, { item: true },
                    React.createElement(Stats, { icon: React.createElement(EventIcon, null), title: translate('resources.apis.list.cards.fields.updated', {
                            date: formattedDate,
                        }) },
                        React.createElement(StatsText, null, formattedDate)))))));
};
export const ApiCardHeader = props => {
    const classes = useApiCardHeaderStyles(props);
    return React.createElement(CardHeader, Object.assign({}, props, { classes: classes }));
};
const useApiCardHeaderStyles = makeStyles({
    content: {
        minWidth: '0%',
    },
});
//# sourceMappingURL=ApiCard.js.map