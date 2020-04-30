var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
export const SidebarButton = (_a) => {
    var { open } = _a, props = __rest(_a, ["open"]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const translate = useTranslate();
    const label = translate(open ? 'ra.actions.close_sidebar' : 'ra.actions.open_sidebar');
    return (React.createElement(Tooltip, { title: label },
        React.createElement(IconButton, Object.assign({ color: "inherit", "aria-label": label, onClick: () => dispatch(toggleSidebar()), className: classNames(classes.root) }, props),
            React.createElement(MenuIcon, { classes: {
                    root: open ? classes.open : classes.closed,
                } }))));
};
//# sourceMappingURL=SidebarButton.js.map