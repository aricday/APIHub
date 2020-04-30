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
const ra_core_1 = require("ra-core");
const core_1 = require("@material-ui/core");
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const DocumentFormConfirmBeforeQuit_1 = require("./DocumentFormConfirmBeforeQuit");
const useStyles = core_1.makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        padding: 0,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(),
        minWidth: `calc(512px + ${theme.spacing(4)}px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${theme.spacing(3)}px)`,
            minWidth: `calc(768px + ${theme.spacing(4)}px)`,
        },
    },
    saveButton: {
        marginLeft: theme.spacing(2),
    },
    error: {
        margin: theme.spacing(2),
    },
    success: {
        color: theme.palette.success.main,
        marginTop: theme.spacing(2),
    },
}));
exports.DocumentFormToolbar = (_a) => {
    var { loading = false, error = null, onCancel = () => { }, pristine } = _a, rest = __rest(_a, ["loading", "error", "onCancel", "pristine"]);
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DocumentFormConfirmBeforeQuit_1.DocumentFormConfirmBeforeQuit, { when: !pristine }),
        error ? (react_1.default.createElement("div", { className: classes.error },
            react_1.default.createElement(Typography_1.default, { variant: "body1", color: "error" },
                react_1.default.createElement(ra_core_1.ValidationError, { error: error })))) : null,
        react_1.default.createElement(react_admin_1.Toolbar, Object.assign({ className: classes.toolbar, pristine: pristine }, rest),
            react_1.default.createElement(CancelButton, { onClick: onCancel }),
            react_1.default.createElement(react_admin_1.SaveButton, { label: "resources.documents.actions.save", className: classes.saveButton, saving: loading }))));
};
const CancelButton = (_a) => {
    var { basePath, handleSubmit, handleSubmitWithRedirect, onSave, invalid, pristine, submitOnEnter, onClick } = _a, rest = __rest(_a, ["basePath", "handleSubmit", "handleSubmitWithRedirect", "onSave", "invalid", "pristine", "submitOnEnter", "onClick"]);
    const translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(Button_1.default, Object.assign({ color: "primary", variant: "outlined", onClick: onClick }, rest), translate('resources.documents.actions.cancel')));
};
//# sourceMappingURL=DocumentFormToolbar.js.map