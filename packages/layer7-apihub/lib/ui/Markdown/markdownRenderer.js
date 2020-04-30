"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const unified_1 = __importDefault(require("unified"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_react_1 = __importDefault(require("remark-react"));
const remove_markdown_1 = __importDefault(require("remove-markdown"));
const merge_1 = __importDefault(require("lodash/merge"));
exports.removeTags = text => {
    return remove_markdown_1.default(text);
};
// TODO: complete supported markdown syntax
const markdownOptions = {
    remarkReactComponents: {
        h1: props => react_1.default.createElement(Typography_1.default, Object.assign({ variant: "h1" }, props)),
        h2: props => react_1.default.createElement(Typography_1.default, Object.assign({ variant: "h2" }, props)),
        h3: props => react_1.default.createElement(Typography_1.default, Object.assign({ variant: "h3" }, props)),
        h4: props => react_1.default.createElement(Typography_1.default, Object.assign({ variant: "h4" }, props)),
        h5: props => react_1.default.createElement(Typography_1.default, Object.assign({ variant: "h5" }, props)),
        h6: props => react_1.default.createElement(Typography_1.default, Object.assign({ variant: "h6" }, props)),
        p: props => react_1.default.createElement(Typography_1.default, Object.assign({ component: "p", variant: "body1" }, props)),
        a: props => react_1.default.createElement(Link_1.default, Object.assign({}, props)),
        li: props => react_1.default.createElement(Typography_1.default, Object.assign({ component: "li", variant: "body1" }, props)),
        td: props => react_1.default.createElement(Typography_1.default, Object.assign({ component: "td", variant: "body1" }, props)),
        code: props => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const classes = useMarkdownStyles();
            return (react_1.default.createElement(Typography_1.default, Object.assign({ component: "code", variant: "body1", className: classes.code }, props)));
        },
    },
};
const useMarkdownStyles = styles_1.makeStyles(theme => ({
    code: {
        fontFamily: 'initial',
        backgroundColor: theme.palette.grey['300'],
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
}));
exports.markdownRenderer = (text, options = {}) => unified_1.default()
    .use(remark_parse_1.default)
    .use(remark_react_1.default, merge_1.default({}, markdownOptions, options))
    .processSync(text).contents;
//# sourceMappingURL=markdownRenderer.js.map