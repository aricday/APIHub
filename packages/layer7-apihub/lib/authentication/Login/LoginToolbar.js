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
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const useStyles = core_1.makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexBasis: '100%',
        backgroundColor: 'transparent',
        padding: 0,
    },
    circularProgress: {
        color: theme.palette.grey[500],
    },
}));
exports.LoginToolbar = (_a) => {
    var { loading = false, error = null } = _a, rest = __rest(_a, ["loading", "error"]);
    const classes = useStyles(rest);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        error ? (react_1.default.createElement(Typography_1.default, { variant: "body1", color: "error", className: classes.error },
            react_1.default.createElement(ra_core_1.ValidationError, { error: error }))) : null,
        react_1.default.createElement(react_admin_1.Toolbar, Object.assign({ className: classes.toolbar }, rest),
            react_1.default.createElement(react_admin_1.SaveButton, { icon: loading ? (react_1.default.createElement(CircularProgress_1.default, { className: classes.circularProgress, size: 15 })) : (react_1.default.createElement("span", null)), label: "apihub.login.actions.sign_in", disabled: loading }))));
};
//# sourceMappingURL=LoginToolbar.js.map