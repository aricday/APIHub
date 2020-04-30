import React from 'react';
import { SaveButton, Toolbar } from 'react-admin';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexBasis: '100%',
        backgroundColor: 'transparent',
        padding: 0,
    },
});
export const ResetPasswordToolbar = props => {
    const classes = useStyles(props);
    return (React.createElement(Toolbar, Object.assign({ className: classes.toolbar }, props),
        React.createElement(SaveButton, { icon: React.createElement("span", null), label: "apihub.reset_password.actions.submit" })));
};
//# sourceMappingURL=ResetPasswordToolbar.js.map