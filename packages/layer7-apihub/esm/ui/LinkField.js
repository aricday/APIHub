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
import pure from 'recompose/pure';
import Link from '@material-ui/core/Link';
export const LinkField = pure((_a) => {
    var { addLabel, className, source, record = {} } = _a, rest = __rest(_a, ["addLabel", "className", "source", "record"]);
    return (React.createElement(Link, Object.assign({ className: className, href: get(record, source) }, rest), get(record, source)));
});
LinkField.defaultProps = {
    addLabel: true,
};
LinkField.displayName = 'LinkField';
export default LinkField;
//# sourceMappingURL=LinkField.js.map