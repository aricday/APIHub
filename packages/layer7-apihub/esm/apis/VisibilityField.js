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
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
export const VisibilityField = (_a) => {
    var { basePath, record, source } = _a, props = __rest(_a, ["basePath", "record", "source"]);
    const value = get(record, source);
    const translate = useTranslate();
    return (React.createElement(Typography, Object.assign({ variant: "body2" }, props), translate(`resources.apis.accessStatus.${value.toLowerCase()}`)));
};
//# sourceMappingURL=VisibilityField.js.map