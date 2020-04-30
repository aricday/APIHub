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
import Tooltip from '@material-ui/core/Tooltip';
import format from 'date-fns/format';
export const LastUpdateField = (_a) => {
    var { basePath, record, source, addPrefix } = _a, props = __rest(_a, ["basePath", "record", "source", "addPrefix"]);
    const value = get(record, source);
    const translate = useTranslate();
    if (!value) {
        return null;
    }
    const date = new Date(value);
    const formattedDate = format(date, 'P');
    let label = addPrefix
        ? translate('resources.apis.last_update.fields.updated', {
            date: formattedDate,
        })
        : formattedDate;
    return (React.createElement(Tooltip, { title: format(date, 'P') },
        React.createElement(Typography, Object.assign({ variant: "body2" }, props), label)));
};
//# sourceMappingURL=LastUpdateField.js.map