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
import { Labeled, InputHelperText, useInput } from 'react-admin';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { MarkdownEditor, markdownRenderer as defaultMarkdownRenderer, } from './';
const useStyles = makeStyles({
    editor: {
        '& .rc-md-editor': {
            width: '100%',
            height: '40vh',
        },
    },
});
export const MarkdownInput = (_a) => {
    var { markdownRenderer = defaultMarkdownRenderer, options = {}, helperText, formClassName, className } = _a, rest = __rest(_a, ["markdownRenderer", "options", "helperText", "formClassName", "className"]);
    const classes = useStyles(rest);
    const { input: { onChange, value, name }, meta: { error, touched }, } = useInput(Object.assign({}, rest));
    return (React.createElement(Labeled, Object.assign({ className: classNames(formClassName, className) }, rest, { id: "textarea" }),
        React.createElement("div", { className: classes.editor },
            React.createElement(MarkdownEditor, { name: name, value: value, markdownRenderer: markdownRenderer, options: options, onChange: onChange }),
            React.createElement(FormHelperText, { error: !!error, variant: "filled", margin: "dense" },
                React.createElement(InputHelperText, { touched: touched, error: error, helperText: helperText })))));
};
//# sourceMappingURL=MarkdownInput.js.map