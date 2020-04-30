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
import { useTranslate, useGetManyReference } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/Tabs/TabScrollButton';
import classnames from 'classnames';
const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: 0,
        maxWidth: 300,
        minHeight: 'unset',
        position: 'relative',
    },
    tab: {
        minHeight: 'unset',
        minWidth: 'unset',
        maxWidth: 'unset',
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
    },
    tag: {
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'transparent',
        border: '1px solid',
        '& + &': {
            marginLeft: theme.spacing(),
        },
    },
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));
export const TagsField = props => {
    const { className, record, source, color = 'primary', variant = 'outlined', size = 'small', } = props;
    const classes = useStyles(props);
    const tags = get(record, source, []);
    return (React.createElement(Tabs, { variant: "scrollable", className: classes.root, scrollButtons: "on", ScrollButtonComponent: TagsFieldScrollButton, component: "ul", value: false }, tags.map(tag => (React.createElement(Tab, { key: tag, className: classes.tab, disableFocusRipple: true, disableRipple: true, component: "li", value: tag, label: React.createElement(Chip, { label: tag, className: classnames(classes.tag, className), color: color, variant: variant, size: size }) })))));
};
export const TagsFieldScrollButton = props => {
    const { onClick } = props, rest = __rest(props, ["onClick"]);
    const handleClick = event => {
        event.stopPropagation();
        onClick(event);
    };
    return React.createElement(TabScrollButton, Object.assign({ onClick: handleClick }, rest));
};
export const AsyncTagsField = props => {
    const { id, variant = 'outlined', color = 'primary' } = props;
    const translate = useTranslate();
    const classes = useStyles(props);
    const { data, loaded, error } = useGetManyReference('tags', 'id', id, undefined, undefined, undefined, 'apis');
    if (!loaded) {
        return React.createElement(LinearProgress, null);
    }
    if (error) {
        return (React.createElement(Typography, { variant: "body2", className: classes.error }, translate('ra.page.error')));
    }
    const tags = data ? Object.keys(data).map(key => data[key]) : [];
    return (React.createElement(React.Fragment, null, tags.map(tag => (React.createElement(Chip, { key: tag.id, label: tag.name, className: classes.tag, variant: variant, color: color })))));
};
//# sourceMappingURL=TagsField.js.map