"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_markdown_editor_lite_1 = __importDefault(require("react-markdown-editor-lite"));
require("react-markdown-editor-lite/lib/index.css");
const _1 = require("./");
const defaultOptions = {
    canView: {
        menu: true,
        md: true,
        html: true,
        fullScreen: false,
        hideMenu: false,
    },
    syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
};
exports.MarkdownEditor = ({ markdownRenderer = _1.markdownRenderer, options = {}, name, value, onChange, className, }) => {
    const handleChange = ({ text }) => {
        onChange(text);
    };
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement(react_markdown_editor_lite_1.default, { name: name, value: value, renderHTML: markdownRenderer, config: Object.assign(Object.assign({}, defaultOptions), options), onChange: handleChange })));
};
//# sourceMappingURL=MarkdownEditor.js.map