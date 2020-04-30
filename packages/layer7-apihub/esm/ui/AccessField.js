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
import { useTranslate } from 'ra-core';
import classnames from 'classnames';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
const useAccessFieldStyles = makeStyles(theme => ({
    root: { borderRadius: theme.spacing(0.5) },
    enabled: {
        backgroundColor: theme.palette.success.main,
    },
}));
export const AccessField = (_a) => {
    var { basePath, record, source, translationKey } = _a, props = __rest(_a, ["basePath", "record", "source", "translationKey"]);
    const value = get(record, source);
    const enabled = value === 'ENABLED';
    const color = enabled ? 'primary' : 'default';
    const classes = useAccessFieldStyles();
    const translate = useTranslate();
    return (React.createElement(Chip, Object.assign({ color: color, disabled: !enabled, className: classnames(classes.root, { [classes.enabled]: enabled }), label: translate(`${translationKey}.${value.toLowerCase()}`) }, props)));
};
//# sourceMappingURL=AccessField.js.map