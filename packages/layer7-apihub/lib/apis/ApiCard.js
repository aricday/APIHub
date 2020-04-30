"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ra_core_1 = require("ra-core");
const classnames_1 = __importDefault(require("classnames"));
const react_router_dom_1 = require("react-router-dom");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardHeader_1 = __importDefault(require("@material-ui/core/CardHeader"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Apps_1 = __importDefault(require("@material-ui/icons/Apps"));
const AccessTime_1 = __importDefault(require("@material-ui/icons/AccessTime"));
const Event_1 = __importDefault(require("@material-ui/icons/Event"));
const format_1 = __importDefault(require("date-fns/format"));
const ui_1 = require("../ui");
const TagsField_1 = require("./TagsField");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 0,
    },
    description: {
        flex: 1,
        overflow: 'hidden',
        // NOTE: We use some deprecated CSS props here but they are still well supported.
        // Besides, a new draft specification exists https://www.w3.org/TR/css-overflow-3/#propdef--webkit-line-clamp
        lineClamp: 3,
        boxOrient: 'vertical',
        display: '-webkit-box',
    },
    subheader: {
        display: 'flex',
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.caption.fontSize,
    },
    title: {
        fontFamily: theme.typography.subtitle2.fontFamily,
        fontSize: theme.typography.subtitle2.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        wordBreak: 'break-word',
        maxWidth: '100%',
        marginBottom: theme.spacing(),
    },
    enabledContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
    },
    enabled: {
        color: theme.palette.success.main,
        '& $enabledIcon': {
            backgroundColor: theme.palette.success.main,
        },
    },
    disabled: {
        '& $enabledIcon': {
            backgroundColor: theme.palette.text.disabled,
        },
    },
    enabledIcon: {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        borderRadius: 99999,
        marginRight: theme.spacing(),
    },
    ssgServiceType: {
        fontWeight: theme.typography.fontWeightBold,
    },
    divider: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        minHeight: theme.spacing(2),
    },
    contentDivider: {
        width: '100%',
        marginBottom: theme.spacing(),
        marginTop: 0,
    },
    stats: {
        marginTop: 'auto',
    },
    tags: {
        minHeight: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    tag: {
        borderRadius: theme.spacing(0.5),
        fontWeight: theme.typography.fontWeightBold,
        '& + &': {
            marginLeft: theme.spacing(0.5),
        },
    },
}));
exports.ApiCard = ({ basePath, record }) => {
    const classes = useStyles();
    const translate = ra_core_1.useTranslate();
    const formattedDate = record ? format_1.default(record.modifyTs, 'P') : '';
    return (react_1.default.createElement(Card_1.default, { className: classes.root, component: react_router_dom_1.Link, to: ra_core_1.linkToRecord(basePath, record && record.id, 'show') },
        react_1.default.createElement(exports.ApiCardHeader, { className: classes.header, title: react_1.default.createElement(Tooltip_1.default, { title: record.name },
                react_1.default.createElement(Typography_1.default, { variant: "h5", component: "span", display: "block", className: classes.title, noWrap: true }, record.name)), disableTypography: true, subheader: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: classes.subheader },
                    react_1.default.createElement("div", { className: classnames_1.default(classes.enabledContainer, {
                            [classes.enabled]: record.portalStatus === 'ENABLED',
                            [classes.disabled]: record.portalStatus !== 'ENABLED',
                        }) },
                        react_1.default.createElement("div", { className: classes.enabledIcon }),
                        react_1.default.createElement(Typography_1.default, { variant: "caption" }, translate(`resources.apis.portalStatus.${record.portalStatus.toLowerCase()}`))),
                    react_1.default.createElement(Divider_1.default, { orientation: "vertical", className: classes.divider }),
                    react_1.default.createElement(Typography_1.default, { variant: "caption", color: "textSecondary", className: classes.ssgServiceType }, record.ssgServiceType),
                    react_1.default.createElement(Divider_1.default, { orientation: "vertical", className: classes.divider }),
                    react_1.default.createElement(Tooltip_1.default, { title: record.version },
                        react_1.default.createElement(Typography_1.default, { variant: "caption", color: "textSecondary", noWrap: true }, translate('resources.apis.list.cards.fields.version', {
                            version: record.version,
                        }))))) }),
        react_1.default.createElement(CardContent_1.default, { className: classes.content },
            react_1.default.createElement(Tooltip_1.default, { title: record.description || '' },
                react_1.default.createElement(ui_1.MarkdownView, { className: classes.description, value: record.description }))),
        react_1.default.createElement(CardActions_1.default, { className: classes.footer },
            react_1.default.createElement(Divider_1.default, { variant: "middle", className: classes.contentDivider }),
            react_1.default.createElement(Grid_1.default, { container: true, alignItems: "center", className: classes.tags },
                react_1.default.createElement(TagsField_1.TagsField, { record: record, source: "tags", className: classes.tag })),
            react_1.default.createElement(Grid_1.default, { container: true, alignItems: "center", className: classes.stats },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(ui_1.Stats, { icon: react_1.default.createElement(Apps_1.default, null), title: translate('resources.apis.list.cards.fields.applications_long', {
                            smart_count: record.applicationUsage || 0,
                        }) },
                        react_1.default.createElement(ui_1.StatsText, null, translate('resources.apis.list.cards.fields.applications', {
                            smart_count: record.applicationUsage || 0,
                        })))),
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(ui_1.Stats, { icon: react_1.default.createElement(AccessTime_1.default, null), title: translate('resources.apis.list.cards.fields.averageLatency_long', {
                            smart_count: record.averageLatency || 0,
                        }) },
                        react_1.default.createElement(ui_1.StatsText, null, translate('resources.apis.list.cards.fields.averageLatency', {
                            ms: record.averageLatency || 0,
                        })))),
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(ui_1.Stats, { icon: react_1.default.createElement(Event_1.default, null), title: translate('resources.apis.list.cards.fields.updated', {
                            date: formattedDate,
                        }) },
                        react_1.default.createElement(ui_1.StatsText, null, formattedDate)))))));
};
exports.ApiCardHeader = props => {
    const classes = useApiCardHeaderStyles(props);
    return react_1.default.createElement(CardHeader_1.default, Object.assign({}, props, { classes: classes }));
};
const useApiCardHeaderStyles = styles_1.makeStyles({
    content: {
        minWidth: '0%',
    },
});
//# sourceMappingURL=ApiCard.js.map