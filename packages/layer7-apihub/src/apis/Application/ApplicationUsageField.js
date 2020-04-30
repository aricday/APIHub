import React from 'react';
import classNames from 'classnames';
import { useGetList } from 'react-admin';
import { useTranslate } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
    },
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));

export const ApplicationUsageField = ({ className, id }) => {
    const translate = useTranslate();
    const classes = useStyles();

    const { data, loaded, error } = useGetList(
        'applications',
        undefined,
        { field: 'name', order: 'ASC' },
        {
            apiUuid: id,
        }
    );

    if (!loaded) {
        return <LinearProgress />;
    }

    if (!data || error) {
        return (
            <Typography variant="body2" className={classes.error}>
                {translate('ra.page.error')}
            </Typography>
        );
    }

    return (
        <Typography
            variant="body2"
            className={classNames(className, classes.root)}
        >
            {data && Object.keys(data).length}
        </Typography>
    );
};
