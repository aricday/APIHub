import React from 'react';
import { useTranslate, linkToRecord } from 'ra-core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
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
        textDecoration: 'none',
    },
    content: { display: 'flex', flexDirection: 'column', flex: 1 },
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

export const ApplicationCard = ({ basePath, record }) => {
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <Card
            className={classes.root}
            component={Link}
            to={linkToRecord(basePath, record && record.id, 'show')}
        >
            <CardHeader
                className={classes.header}
                title={
                    <Tooltip title={record.name}>
                        <Typography
                            variant="h5"
                            component="span"
                            display="block"
                            className={classes.title}
                            noWrap
                        >
                            {record.name}
                        </Typography>
                    </Tooltip>
                }
                disableTypography
                subheader={
                    <Grid
                        container
                        alignItems="center"
                        className={classes.subheader}
                    >
                        <Grid
                            item
                            container
                            alignItems="center"
                            className={classNames(classes.enabledContainer, {
                                [classes.enabled]: record.status === 'ENABLED',
                                [classes.disabled]: record.status !== 'ENABLED',
                            })}
                        >
                            <div className={classes.enabledIcon} />
                            {record.status && (
                                <Typography variant="caption">
                                    {translate(
                                        `resources.apis.portalStatus.${record.status.toLowerCase()}`
                                    )}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                }
            />
            <CardContent className={classes.content}>
                <Typography variant="body1">
                    {translate('resources.applications.fields.apiKey', {
                        apiKey: record.id,
                    })}
                </Typography>
                <Tooltip title={record.id || ''}>
                    <Typography variant="caption">{record.id}</Typography>
                </Tooltip>
            </CardContent>
        </Card>
    );
};
