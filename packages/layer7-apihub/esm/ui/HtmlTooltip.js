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
import { Tooltip } from '@material-ui/core';
export const textToHtml = text => text.replace(/\n/g, '<br />');
export const HtmlTooltip = (_a) => {
    var { children, title } = _a, rest = __rest(_a, ["children", "title"]);
    const html = textToHtml(title);
    return (React.createElement(Tooltip, Object.assign({ title: React.createElement("div", { dangerouslySetInnerHTML: {
                __html: html,
            } }), "aria-label": title }, rest), children));
};
//# sourceMappingURL=HtmlTooltip.js.map