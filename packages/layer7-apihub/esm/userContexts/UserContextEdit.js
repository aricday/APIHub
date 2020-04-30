import React, { useCallback } from 'react';
import { fetchUtils, SaveButton, SimpleForm, TextField, TextInput, Toolbar, required, useNotify, useTranslate, } from 'react-admin';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import { Edit } from '../ui';
import { useApiHub } from '../ApiHubContext';
import { usePasswordEncryption } from '../authentication/usePasswordEncryption';
import { NewPasswordForm } from './NewPasswordForm';
const UserContextTitle = () => {
    const translate = useTranslate();
    return translate('resources.userContexts.title');
};
const validateField = [required()];
export const UserContextEdit = props => {
    const classes = useUserContextEditStyles();
    return (React.createElement(Edit, Object.assign({}, props, { title: React.createElement(UserContextTitle, null), aside: React.createElement(UserContextEditAside, null), successMessage: "resources.userContexts.notifications.update_success" }),
        React.createElement(SimpleForm, { toolbar: React.createElement(UserContextEditToolbar, null), redirect: false },
            React.createElement(TextField, { addLabel: true, source: "userDetails.username", className: classes.field }),
            React.createElement(TextInput, { source: "userDetails.lastName", className: classes.field, validate: validateField }),
            React.createElement(TextInput, { source: "userDetails.firstName", className: classes.field, validate: validateField }),
            React.createElement(TextInput, { source: "userDetails.email", className: classes.field, validate: validateField }))));
};
const useUserContextEditStyles = makeStyles({
    field: {
        width: 456,
    },
});
const UserContextEditToolbar = props => (React.createElement(Toolbar, Object.assign({}, props),
    React.createElement(SaveButton, null)));
export const UserContextEditAside = ({ record }) => {
    const classes = useUserContextEditAsideStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(UserContextEditNewPassword, { record: record })));
};
const useUpdatePassword = ({ user }) => {
    var _a;
    const { url } = useApiHub();
    const notify = useNotify();
    const [publicKey, encrypt] = usePasswordEncryption();
    const uuid = (_a = user) === null || _a === void 0 ? void 0 : _a.uuid;
    return useCallback(async ({ password, newPassword }) => {
        let finalPassword = password;
        let finalNewPassword = newPassword;
        if (publicKey) {
            const [encryptedPassword, encryptedNewPassword,] = await Promise.all([
                encrypt(password),
                encrypt(newPassword),
            ]);
            finalPassword = encryptedPassword;
            finalNewPassword = encryptedNewPassword;
        }
        // This is need to get a special cookie required for password change
        await fetch(`${url}/admin/sessionCheck`, {
            credentials: 'include',
        });
        fetchUtils
            .fetchJson(`${url}/admin/v2/users/password/change`, {
            credentials: 'include',
            body: JSON.stringify({
                password: finalPassword,
                newPassword: finalNewPassword,
                uuid,
            }),
            method: 'PUT',
        })
            .then(() => {
            notify('resources.userContexts.notifications.confirm_password_change');
        })
            .catch(error => {
            if (error.status === 400) {
                notify('resources.userContexts.notifications.invalid_password', 'warning');
            }
            notify('resources.userContexts.notifications.update_error', 'warning');
        });
    }, [encrypt, notify, publicKey, url, uuid]);
};
export const UserContextEditNewPassword = ({ record }) => {
    const handleSubmit = useUpdatePassword({ user: record });
    return (React.createElement(Card, null,
        React.createElement(NewPasswordForm, { onSubmit: handleSubmit })));
};
const useUserContextEditAsideStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(3),
    },
}));
//# sourceMappingURL=UserContextEdit.js.map