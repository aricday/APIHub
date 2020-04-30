"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ra_core_1 = require("ra-core");
const classnames_1 = __importDefault(require("classnames"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const CardHeader_1 = __importDefault(require("@material-ui/core/CardHeader"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
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
        maxWidth: 300,
        marginBottom: theme.spacing(),
    },
    enabledContainer: {
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
    divider: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        minHeight: theme.spacing(2),
    },
}));
exports.ApplicationCard = ({ record }) => {
    const classes = useStyles();
    const translate = ra_core_1.useTranslate();
    return (react_1.default.createElement(Card_1.default, { className: classes.root },
        react_1.default.createElement(CardHeader_1.default, { className: classes.header, title: react_1.default.createElement(Tooltip_1.default, { title: record.name },
                react_1.default.createElement(Typography_1.default, { variant: "h5", component: "span", display: "block", className: classes.title, noWrap: true }, record.name)), disableTypography: true, subheader: react_1.default.createElement(Grid_1.default, { container: true, alignItems: "center", className: classes.subheader },
                react_1.default.createElement(Grid_1.default, { item: true, container: true, alignItems: "center", className: classnames_1.default(classes.enabledContainer, {
                        [classes.enabled]: record.status === 'ENABLED',
                        [classes.disabled]: record.status !== 'ENABLED',
                    }) },
                    react_1.default.createElement("div", { className: classes.enabledIcon }),
                    react_1.default.createElement(Typography_1.default, { variant: "caption" }, translate(`resources.applications.status.${record.status.toLowerCase()}`)))) }),
        react_1.default.createElement(CardContent_1.default, { className: classes.content },
            react_1.default.createElement(Typography_1.default, { variant: "body1" }, translate('resources.applications.fields.apiKey', {
                apiKey: record.id,
            })),
            react_1.default.createElement(Tooltip_1.default, { title: record.id || '' },
                react_1.default.createElement(Typography_1.default, { variant: "caption" }, record.id)))));
};
//# sourceMappingURL=ApplicationCard.js.map