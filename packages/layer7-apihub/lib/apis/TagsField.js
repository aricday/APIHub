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
const get_1 = __importDefault(require("lodash/get"));
const ra_core_1 = require("ra-core");
const styles_1 = require("@material-ui/core/styles");
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
const Tab_1 = __importDefault(require("@material-ui/core/Tab"));
const TabScrollButton_1 = __importDefault(require("@material-ui/core/Tabs/TabScrollButton"));
const classnames_1 = __importDefault(require("classnames"));
const useStyles = styles_1.makeStyles(theme => ({
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
exports.TagsField = props => {
    const { className, record, source, color = 'primary', variant = 'outlined', size = 'small', } = props;
    const classes = useStyles(props);
    const tags = get_1.default(record, source, []);
    return (react_1.default.createElement(Tabs_1.default, { variant: "scrollable", className: classes.root, scrollButtons: "on", ScrollButtonComponent: exports.TagsFieldScrollButton, component: "ul", value: false }, tags.map(tag => (react_1.default.createElement(Tab_1.default, { key: tag, className: classes.tab, disableFocusRipple: true, disableRipple: true, component: "li", value: tag, label: react_1.default.createElement(Chip_1.default, { label: tag, className: classnames_1.default(classes.tag, className), color: color, variant: variant, size: size }) })))));
};
exports.TagsFieldScrollButton = props => {
    const { onClick } = props, rest = __rest(props, ["onClick"]);
    const handleClick = event => {
        event.stopPropagation();
        onClick(event);
    };
    return react_1.default.createElement(TabScrollButton_1.default, Object.assign({ onClick: handleClick }, rest));
};
exports.AsyncTagsField = props => {
    const { id, variant = 'outlined', color = 'primary' } = props;
    const translate = ra_core_1.useTranslate();
    const classes = useStyles(props);
    const { data, loaded, error } = ra_core_1.useGetManyReference('tags', 'id', id, undefined, undefined, undefined, 'apis');
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", className: classes.error }, translate('ra.page.error')));
    }
    const tags = data ? Object.keys(data).map(key => data[key]) : [];
    return (react_1.default.createElement(react_1.default.Fragment, null, tags.map(tag => (react_1.default.createElement(Chip_1.default, { key: tag.id, label: tag.name, className: classes.tag, variant: variant, color: color })))));
};
//# sourceMappingURL=TagsField.js.map