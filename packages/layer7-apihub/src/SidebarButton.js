import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleSidebar, useTranslate } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    closed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    open: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },
}));

export const SidebarButton = ({ open, ...props }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const translate = useTranslate();

    const label = translate(
        open ? 'ra.actions.close_sidebar' : 'ra.actions.open_sidebar'
    );
    return (
        <Tooltip title={label}>
            <IconButton
                color="inherit"
                aria-label={label}
                onClick={() => dispatch(toggleSidebar())}
                className={classNames(classes.root)}
                {...props}
            >
                <MenuIcon
                    classes={{
                        root: open ? classes.open : classes.closed,
                    }}
                />
            </IconButton>
        </Tooltip>
    );
};
