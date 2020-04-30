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
import { useTranslate } from 'react-admin';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { useAuthenticationConfiguration } from '../useAuthenticationConfiguration';
const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));
const CustomDialogTitle = (_a) => {
    var { children, onClose } = _a, rest = __rest(_a, ["children", "onClose"]);
    const classes = useStyles(rest);
    const translate = useTranslate();
    return (React.createElement(DialogTitle, Object.assign({ disableTypography: true, className: classes.root }, rest),
        React.createElement(Typography, { variant: "h6" }, children),
        onClose ? (React.createElement(IconButton, { "aria-label": translate('apihub.account_setup.terms_of_use_dialog.close'), className: classes.closeButton, onClick: onClose },
            React.createElement(Close, null))) : null));
};
const Terms = ({ content }) => (React.createElement(React.Fragment, null, content.split('\n').map((section, index) => (React.createElement(Typography, { key: index, variant: "body2", paragraph: true }, section)))));
export const TermsDialog = ({ open, onClose }) => {
    const translate = useTranslate();
    const { termsOfUse } = useAuthenticationConfiguration();
    return (React.createElement(Dialog, { "aria-labelledby": translate('apihub.account_setup.terms_of_use_dialog.title'), open: open, onClose: onClose, maxWidth: "md", fullWidth: true },
        React.createElement(CustomDialogTitle, { onClose: onClose }, translate('apihub.account_setup.terms_of_use_dialog.title')),
        React.createElement(DialogContent, { dividers: true },
            termsOfUse === null && React.createElement(LinearProgress, null),
            termsOfUse && React.createElement(Terms, { content: termsOfUse })),
        React.createElement(DialogActions, null,
            React.createElement(Button, { autoFocus: true, onClick: onClose, color: "primary" }, translate('apihub.account_setup.terms_of_use_dialog.close')))));
};
//# sourceMappingURL=TermsDialog.js.map