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
import { Toolbar, SaveButton, useTranslate } from 'react-admin';
import { ValidationError } from 'ra-core';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DocumentFormConfirmBeforeQuit } from './DocumentFormConfirmBeforeQuit';
const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        padding: 0,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(),
        minWidth: `calc(512px + ${theme.spacing(4)}px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${theme.spacing(3)}px)`,
            minWidth: `calc(768px + ${theme.spacing(4)}px)`,
        },
    },
    saveButton: {
        marginLeft: theme.spacing(2),
    },
    error: {
        margin: theme.spacing(2),
    },
    success: {
        color: theme.palette.success.main,
        marginTop: theme.spacing(2),
    },
}));
export const DocumentFormToolbar = (_a) => {
    var { loading = false, error = null, onCancel = () => { }, pristine } = _a, rest = __rest(_a, ["loading", "error", "onCancel", "pristine"]);
    const classes = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(DocumentFormConfirmBeforeQuit, { when: !pristine }),
        error ? (React.createElement("div", { className: classes.error },
            React.createElement(Typography, { variant: "body1", color: "error" },
                React.createElement(ValidationError, { error: error })))) : null,
        React.createElement(Toolbar, Object.assign({ className: classes.toolbar, pristine: pristine }, rest),
            React.createElement(CancelButton, { onClick: onCancel }),
            React.createElement(SaveButton, { label: "resources.documents.actions.save", className: classes.saveButton, saving: loading }))));
};
const CancelButton = (_a) => {
    var { basePath, handleSubmit, handleSubmitWithRedirect, onSave, invalid, pristine, submitOnEnter, onClick } = _a, rest = __rest(_a, ["basePath", "handleSubmit", "handleSubmitWithRedirect", "onSave", "invalid", "pristine", "submitOnEnter", "onClick"]);
    const translate = useTranslate();
    return (React.createElement(Button, Object.assign({ color: "primary", variant: "outlined", onClick: onClick }, rest), translate('resources.documents.actions.cancel')));
};
//# sourceMappingURL=DocumentFormToolbar.js.map