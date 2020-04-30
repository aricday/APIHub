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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const styles_1 = require("@material-ui/core/styles");
const icons_1 = require("@material-ui/icons");
const useAuthenticationConfiguration_1 = require("../useAuthenticationConfiguration");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));
const CustomDialogTitle = (_a) => {
    var { children, onClose } = _a, rest = __rest(_a, ["children", "onClose"]);
    const classes = useStyles(rest);
    const translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(DialogTitle_1.default, Object.assign({ disableTypography: true, className: classes.root }, rest),
        react_1.default.createElement(Typography_1.default, { variant: "h6" }, children),
        onClose ? (react_1.default.createElement(IconButton_1.default, { "aria-label": translate('apihub.account_setup.terms_of_use_dialog.close'), className: classes.closeButton, onClick: onClose },
            react_1.default.createElement(icons_1.Close, null))) : null));
};
const Terms = ({ content }) => (react_1.default.createElement(react_1.default.Fragment, null, content.split('\n').map((section, index) => (react_1.default.createElement(Typography_1.default, { key: index, variant: "body2", paragraph: true }, section)))));
exports.TermsDialog = ({ open, onClose }) => {
    const translate = react_admin_1.useTranslate();
    const { termsOfUse } = useAuthenticationConfiguration_1.useAuthenticationConfiguration();
    return (react_1.default.createElement(Dialog_1.default, { "aria-labelledby": translate('apihub.account_setup.terms_of_use_dialog.title'), open: open, onClose: onClose, maxWidth: "md", fullWidth: true },
        react_1.default.createElement(CustomDialogTitle, { onClose: onClose }, translate('apihub.account_setup.terms_of_use_dialog.title')),
        react_1.default.createElement(DialogContent_1.default, { dividers: true },
            termsOfUse === null && react_1.default.createElement(LinearProgress_1.default, null),
            termsOfUse && react_1.default.createElement(Terms, { content: termsOfUse })),
        react_1.default.createElement(DialogActions_1.default, null,
            react_1.default.createElement(Button_1.default, { autoFocus: true, onClick: onClose, color: "primary" }, translate('apihub.account_setup.terms_of_use_dialog.close')))));
};
//# sourceMappingURL=TermsDialog.js.map