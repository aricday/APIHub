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
import React, { useState } from 'react';
import { TextInput } from 'react-admin';
import { useTranslate } from 'ra-core';
import { InfoOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles, IconButton, InputAdornment } from '@material-ui/core';
import { HtmlTooltip } from './HtmlTooltip';
export const PasswordInput = (_a) => {
    var { title } = _a, props = __rest(_a, ["title"]);
    const [passwordVisible, setPasswordVisible] = usePasswordVisibility();
    const translate = useTranslate();
    const classes = useStyles(props);
    return (React.createElement(TextInput, Object.assign({ type: passwordVisible ? 'text' : 'password', variant: "outlined", InputProps: {
            endAdornment: (React.createElement(InputAdornment, { position: "end" },
                React.createElement(React.Fragment, null,
                    React.createElement(IconButton, { "aria-label": translate(passwordVisible
                            ? 'ra.input.password.toggle_visible'
                            : 'ra.input.password.toggle_hidden'), onClick: setPasswordVisible }, passwordVisible ? (React.createElement(VisibilityOff, null)) : (React.createElement(Visibility, null))),
                    title ? (React.createElement(HtmlTooltip, { className: classes.tootip, title: translate(title), placement: "right", arrow: true },
                        React.createElement(InfoOutlined, null))) : null))),
        } }, props)));
};
export const usePasswordVisibility = initialValue => {
    const [visible, setVisible] = useState(initialValue);
    const toggleVisibility = () => {
        setVisible(!visible);
    };
    return [visible, toggleVisibility];
};
const useStyles = makeStyles({
    tootip: {
        cursor: 'pointer',
    },
});
//# sourceMappingURL=PasswordInput.js.map