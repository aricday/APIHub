import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import removeMarkdown from 'remove-markdown';
import merge from 'lodash/merge';
export const removeTags = text => {
    return removeMarkdown(text);
};
// TODO: complete supported markdown syntax
const markdownOptions = {
    remarkReactComponents: {
        h1: props => React.createElement(Typography, Object.assign({ variant: "h1" }, props)),
        h2: props => React.createElement(Typography, Object.assign({ variant: "h2" }, props)),
        h3: props => React.createElement(Typography, Object.assign({ variant: "h3" }, props)),
        h4: props => React.createElement(Typography, Object.assign({ variant: "h4" }, props)),
        h5: props => React.createElement(Typography, Object.assign({ variant: "h5" }, props)),
        h6: props => React.createElement(Typography, Object.assign({ variant: "h6" }, props)),
        p: props => React.createElement(Typography, Object.assign({ component: "p", variant: "body1" }, props)),
        a: props => React.createElement(Link, Object.assign({}, props)),
        li: props => React.createElement(Typography, Object.assign({ component: "li", variant: "body1" }, props)),
        td: props => React.createElement(Typography, Object.assign({ component: "td", variant: "body1" }, props)),
        code: props => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const classes = useMarkdownStyles();
            return (React.createElement(Typography, Object.assign({ component: "code", variant: "body1", className: classes.code }, props)));
        },
    },
};
const useMarkdownStyles = makeStyles(theme => ({
    code: {
        fontFamily: 'initial',
        backgroundColor: theme.palette.grey['300'],
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
}));
export const markdownRenderer = (text, options = {}) => unified()
    .use(parse)
    .use(remark2react, merge({}, markdownOptions, options))
    .processSync(text).contents;
//# sourceMappingURL=markdownRenderer.js.map