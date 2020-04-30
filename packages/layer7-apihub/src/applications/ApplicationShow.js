import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Show } from '../ui';
import { ApplicationDetails } from './ApplicationDetails';

const useAppDetailsStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        margin: -theme.spacing(1),
    },
    enabledContainer: {
        display: 'flex',
        flex: 'wrap',
        width: 'auto',
        alignItems: 'center',
        marginTop: theme.spacing(1),
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
}));

const AppTitle = ({ record }) => {
    const classes = useAppDetailsStyles();
    if (!record) {
        return null;
    }
    return (
        <div>
            <div>{record ? record.Name : ''}</div>
            <div
                className={classNames(classes.enabledContainer, {
                    [classes.enabled]: record.Status === 'ENABLED',
                    [classes.disabled]: record.Status !== 'ENABLED',
                })}
            >
                <div className={classes.enabledIcon} />
                <Typography variant="body2">
                    {record.Status && record.Status.toLowerCase()}
                </Typography>
            </div>
        </div>
    );
};

export const ApplicationShow = ({ permissions, id, ...rest }) => {
    return (
        <Show title={<AppTitle />} id={id} {...rest}>
            <ApplicationDetails />
        </Show>
    );
};
