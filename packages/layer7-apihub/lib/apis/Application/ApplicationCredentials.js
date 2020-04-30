"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const styles_1 = require("@material-ui/core/styles");
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        border: `solid 1px ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    mainKey: {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
    },
    secondaryKey: {
        color: theme.palette.text.primary,
    },
    label: {
        marginRight: theme.spacing(1),
    },
}));
exports.ApplicationCredentials = ({ id }) => {
    const classes = useStyles();
    const translate = react_admin_1.useTranslate();
    const { data, loaded, error } = react_admin_1.useGetOne('applications', id);
    if (!loaded) {
        return react_1.default.createElement(CircularProgress_1.default, { color: "primary" });
    }
    if (!data || error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    const { apiKey, keySecret } = data;
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(Typography_1.default, { variant: "subtitle1", className: classes.mainKey },
            react_1.default.createElement("span", { className: classes.label }, translate('resources.applications.fields.apiKey')),
            apiKey),
        react_1.default.createElement(Typography_1.default, { variant: "body2", className: classes.secondaryKey },
            react_1.default.createElement("span", { className: classes.label }, translate('resources.applications.fields.keySecret')),
            keySecret)));
};
//# sourceMappingURL=ApplicationCredentials.js.map