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
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
export const ConfirmDialog = (_a) => {
    var { title, content, buttonConfirm, buttonCancel, open = false, onConfirm = () => { }, onCancel = () => { } } = _a, rest = __rest(_a, ["title", "content", "buttonConfirm", "buttonCancel", "open", "onConfirm", "onCancel"]);
    return (React.createElement(Dialog, Object.assign({ maxWidth: "xs", "aria-labelledby": "confirmation-dialog-title", open: open, onClose: onCancel }, rest),
        React.createElement(DialogTitle, { id: "confirmation-dialog-title" }, title),
        React.createElement(DialogContent, { dividers: true }, content),
        React.createElement(DialogActions, null,
            React.createElement(Button, { autoFocus: true, onClick: onCancel, variant: "outlined", color: "secondary" }, buttonConfirm),
            React.createElement(Button, { onClick: onConfirm, variant: "contained", color: "primary" }, buttonCancel))));
};
//# sourceMappingURL=ConfirmDialog.js.map