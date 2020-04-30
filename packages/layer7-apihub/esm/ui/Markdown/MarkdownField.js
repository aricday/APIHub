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
import get from 'lodash/get';
import { TextField } from 'react-admin';
import { MarkdownView, removeTags } from '.';
import { TruncatedTextField } from '../';
export const MarkdownField = (_a) => {
    var { record, source, stripTags = false, truncate } = _a, rest = __rest(_a, ["record", "source", "stripTags", "truncate"]);
    const value = get(record, source, '');
    if (stripTags) {
        const newRecord = Object.assign(Object.assign({}, record), { [source]: removeTags(value) });
        return truncate ? (React.createElement(TruncatedTextField, Object.assign({ record: newRecord, source: source }, rest))) : (React.createElement(TextField, Object.assign({ record: newRecord, source: source }, rest)));
    }
    return React.createElement(MarkdownView, Object.assign({ value: value }, rest));
};
//# sourceMappingURL=MarkdownField.js.map