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
import { SaveButton, Toolbar } from 'react-admin';
import { ValidationError } from 'ra-core';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexBasis: '100%',
        backgroundColor: 'transparent',
        padding: 0,
    },
    circularProgress: {
        color: theme.palette.grey[500],
    },
}));
export const LoginToolbar = (_a) => {
    var { loading = false, error = null } = _a, rest = __rest(_a, ["loading", "error"]);
    const classes = useStyles(rest);
    return (React.createElement(React.Fragment, null,
        error ? (React.createElement(Typography, { variant: "body1", color: "error", className: classes.error },
            React.createElement(ValidationError, { error: error }))) : null,
        React.createElement(Toolbar, Object.assign({ className: classes.toolbar }, rest),
            React.createElement(SaveButton, { icon: loading ? (React.createElement(CircularProgress, { className: classes.circularProgress, size: 15 })) : (React.createElement("span", null)), label: "apihub.login.actions.sign_in", disabled: loading }))));
};
//# sourceMappingURL=LoginToolbar.js.map