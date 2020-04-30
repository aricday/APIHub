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
import React, { useState, useCallback } from 'react';
import { Link, InputHelperText, useInput, useTranslate } from 'react-admin';
import { FormGroup, FormControlLabel, FormHelperText, Checkbox, Typography, } from '@material-ui/core';
import { TermsDialog } from './TermsDialog';
export const TermsLabel = () => {
    const translate = useTranslate();
    const [isOpen, setIsOpen] = useState();
    const handleOpen = event => {
        event.preventDefault();
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1" },
            translate('apihub.account_setup.terms_of_use_acknowledgement'),
            React.createElement(Link, { to: "#", onClick: handleOpen }, translate('apihub.account_setup.terms_of_use'))),
        isOpen === true && (React.createElement(TermsDialog, { open: isOpen, onClose: handleClose }))));
};
export const TermsInput = (_a) => {
    var { helperText } = _a, rest = __rest(_a, ["helperText"]);
    const _b = useInput(Object.assign({}, rest)), _c = _b.input, { onChange, type, value } = _c, inputProps = __rest(_c, ["onChange", "type", "value"]), { meta: { error, touched } } = _b;
    const handleChange = useCallback((_, value) => {
        onChange(value);
    }, [onChange]);
    return (React.createElement(FormGroup, null,
        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, Object.assign({ color: "primary", onChange: handleChange }, inputProps)), label: React.createElement(TermsLabel, null), labelPlacement: "end" }),
        React.createElement(FormHelperText, { error: !!error },
            React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText }))));
};
//# sourceMappingURL=TermsInput.js.map