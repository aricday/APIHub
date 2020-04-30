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
import React, { forwardRef } from 'react';
import { markdownRenderer as defaultMarkdownRenderer } from '.';
export const MarkdownView = forwardRef((_a, ref) => {
    var { value, markdownRenderer = defaultMarkdownRenderer, markdownOptions = {} } = _a, props = __rest(_a, ["value", "markdownRenderer", "markdownOptions"]);
    return (React.createElement("div", Object.assign({ ref: ref }, props), markdownRenderer(value, markdownOptions)));
});
//# sourceMappingURL=MarkdownView.js.map