import React from 'react';
import ReactMarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { markdownRenderer as defaultMarkdownRenderer } from './';
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
export const MarkdownEditor = ({ markdownRenderer = defaultMarkdownRenderer, options = {}, name, value, onChange, className, }) => {
    const handleChange = ({ text }) => {
        onChange(text);
    };
    return (React.createElement("div", { className: className },
        React.createElement(ReactMarkdownEditor, { name: name, value: value, renderHTML: markdownRenderer, config: Object.assign(Object.assign({}, defaultOptions), options), onChange: handleChange })));
};
//# sourceMappingURL=MarkdownEditor.js.map