import React from 'react';
import { SimpleForm } from 'react-admin';
import { required } from 'ra-core';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import { NewPasswordToolbar } from './NewPasswordToolbar';
import { PasswordInput } from '../ui';
import { validatePassword } from '../authentication/validatePassword';
const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
export const NewPasswordForm = props => {
    const { onSubmit } = props;
    const classes = useStyles(props);
    const validate = ({ newPassword, confirm_password }) => {
        if (newPassword !== confirm_password) {
            return {
                [FORM_ERROR]: 'resources.userContexts.validation.error_password_match',
            };
        }
    };
    return (React.createElement(SimpleForm, Object.assign({ className: classes.form, save: onSubmit, toolbar: React.createElement(NewPasswordToolbar, null), validate: validate }, props),
        React.createElement(PasswordInput, { source: "password", label: "resources.userContexts.fields.userDetails.current_password", fullWidth: true, validate: [required()], title: "resources.userContexts.validation.tooltip_password" }),
        React.createElement(PasswordInput, { source: "newPassword", label: "resources.userContexts.fields.userDetails.password", fullWidth: true, validate: [required(), validatePassword], title: "resources.userContexts.validation.tooltip_password" }),
        React.createElement(PasswordInput, { source: "confirm_password", label: "resources.userContexts.fields.userDetails.confirm_password", fullWidth: true, validate: required(), title: "resources.userContexts.tooltip_password_confirm" })));
};
//# sourceMappingURL=NewPasswordForm.js.map