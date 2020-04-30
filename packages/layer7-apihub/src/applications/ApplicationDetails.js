import React from 'react';
import classNames from 'classnames';
import { Labeled, TextField, useNotify } from 'react-admin';
import { useTranslate } from 'ra-core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconFileCopy from '@material-ui/icons/FileCopy';
import { ApplicationApisList } from './ApplicationApisList';

const useAppDetailsStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        margin: -theme.spacing(0),
    },
    field: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        minWidth: '100px',
    },
    type: {
        textTransform: 'uppercase',
    },
    apiKeySection: {
        borderTop: `20px solid ${theme.palette.background.default}`,
        paddingTop: '20px',
    },
}));

const useHeaderStyles = makeStyles(theme => ({
    label: {
        textTransform: 'uppercase',
        marginLeft: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    },
    value: {
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'uppercase',
        marginLeft: theme.spacing(1),
    },
}));

const useContentStyles = makeStyles(theme => ({
    label: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1.5rem',
    },
}));

const useGridStyles = makeStyles(theme => ({
    root: {
        borderBottom: `10px solid ${theme.palette.background.default}`,
    },
}));

const useRightGridStyles = makeStyles(theme => ({
    root: {
        borderBottom: `10px solid ${theme.palette.background.default}`,
        borderLeft: `10px solid ${theme.palette.background.default}`,
    },
}));

export const ApplicationDetails = ({ record }) => {
    const classes = useAppDetailsStyles();
    const gridClasses = useGridStyles();
    const rightGridClasses = useRightGridStyles();
    const headerLabelClasses = useHeaderStyles();
    const contentLabelClasses = useContentStyles();
    const translate = useTranslate();
    const notify = useNotify();
    const apis = (record.ApiIds && record.ApiIds.results) || [];
    async function copyToClipboard(e) {
        if (!navigator.clipboard) {
            // Error message 'Copy to clipboard not supported'
            return;
        }
        const textToCopy = e.currentTarget.value;
        try {
            await navigator.clipboard.writeText(textToCopy);
            notify(
                translate('resources.applications.notifications.copy_success')
            );
            // Success message 'Copied to clipboard!'
        } catch (err) {
            notify(
                translate('resources.applications.notifications.copy_error')
            );
        }
    }
    return (
        <>
            <Grid className={classes.root} container spacing={3}>
                <Grid
                    container
                    item
                    md={6}
                    sm={12}
                    direction="column"
                    classes={gridClasses}
                >
                    <Grid
                        item
                        container
                        direction="column"
                        className={useAppDetailsStyles.apiKeySection}
                    >
                        <Grid item>
                            <Labeled
                                label="resources.applications.fields.apiKey"
                                classes={contentLabelClasses}
                                className={classes.field}
                            >
                                <Typography variant="body2">
                                    {record.ApiKey}
                                    <IconButton
                                        color="primary"
                                        title={translate(
                                            'resources.applications.notifications.copy_to_clipboard'
                                        )}
                                        value={record.ApiKey}
                                        onClick={copyToClipboard}
                                    >
                                        <IconFileCopy
                                            style={{ fontSize: '1rem' }}
                                        />
                                    </IconButton>
                                </Typography>
                            </Labeled>
                        </Grid>
                        <Grid item>
                            <Labeled
                                label="resources.applications.fields.sharedSecretClientSecret"
                                classes={contentLabelClasses}
                                className={classes.field}
                            >
                                <Typography variant="body2">
                                    {record.KeySecret}
                                    <IconButton
                                        color="primary"
                                        title={translate(
                                            'resources.applications.notifications.copy_to_clipboard'
                                        )}
                                        value={record.KeySecret}
                                        onClick={copyToClipboard}
                                    >
                                        <IconFileCopy
                                            style={{ fontSize: '1rem' }}
                                        />
                                    </IconButton>
                                </Typography>
                            </Labeled>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    md={6}
                    sm={12}
                    direction="column"
                    classes={rightGridClasses}
                    justify="flex-start"
                >
                    <Grid item>
                        <Labeled
                            label="resources.applications.fields.description"
                            classes={contentLabelClasses}
                            className={classes.field}
                        >
                            <TextField record={record} source="Description" />
                        </Labeled>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body2"
                            className={headerLabelClasses.value}
                        >
                            {translate(
                                'resources.applications.notifications.configuration'
                            )}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Labeled
                            label="resources.applications.fields.oauthCallbackURL"
                            classes={contentLabelClasses}
                            className={classes.field}
                        >
                            <TextField
                                record={record}
                                source="OauthCallbackUrl"
                            />
                        </Labeled>
                    </Grid>
                    <Grid item>
                        <Labeled
                            label="resources.applications.fields.oauthScope"
                            classes={contentLabelClasses}
                            className={classes.field}
                        >
                            <TextField record={record} source="OauthScope" />
                        </Labeled>
                    </Grid>
                    <Grid item>
                        <Labeled
                            label="resources.applications.fields.oauthType"
                            classes={contentLabelClasses}
                            className={classes.field}
                        >
                            <TextField record={record} source="OauthType" />
                        </Labeled>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={classes.root} container>
                <Grid
                    item
                    container
                    direction="row"
                    justify="center"
                    md={12}
                    sm={12}
                >
                    {apis.length && <ApplicationApisList apis={apis} />}
                </Grid>
            </Grid>
        </>
    );
};
