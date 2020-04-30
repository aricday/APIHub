"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const classnames_1 = __importDefault(require("classnames"));
const core_1 = require("@material-ui/core");
const FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
const _1 = require("./");
const useStyles = core_1.makeStyles({
    editor: {
        '& .rc-md-editor': {
            width: '100%',
            height: '40vh',
        },
    },
});
exports.MarkdownInput = (_a) => {
    var { markdownRenderer = _1.markdownRenderer, options = {}, helperText, formClassName, className } = _a, rest = __rest(_a, ["markdownRenderer", "options", "helperText", "formClassName", "className"]);
    const classes = useStyles(rest);
    const { input: { onChange, value, name }, meta: { error, touched }, } = react_admin_1.useInput(Object.assign({}, rest));
    return (react_1.default.createElement(react_admin_1.Labeled, Object.assign({ className: classnames_1.default(formClassName, className) }, rest, { id: "textarea" }),
        react_1.default.createElement("div", { className: classes.editor },
            react_1.default.createElement(_1.MarkdownEditor, { name: name, value: value, markdownRenderer: markdownRenderer, options: options, onChange: onChange }),
            react_1.default.createElement(FormHelperText_1.default, { error: !!error, variant: "filled", margin: "dense" },
                react_1.default.createElement(react_admin_1.InputHelperText, { touched: touched, error: error, helperText: helperText })))));
};
//# sourceMappingURL=MarkdownInput.js.map