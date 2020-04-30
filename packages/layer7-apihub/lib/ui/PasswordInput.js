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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const icons_1 = require("@material-ui/icons");
const core_1 = require("@material-ui/core");
const HtmlTooltip_1 = require("./HtmlTooltip");
exports.PasswordInput = (_a) => {
    var { title } = _a, props = __rest(_a, ["title"]);
    const [passwordVisible, setPasswordVisible] = exports.usePasswordVisibility();
    const translate = ra_core_1.useTranslate();
    const classes = useStyles(props);
    return (react_1.default.createElement(react_admin_1.TextInput, Object.assign({ type: passwordVisible ? 'text' : 'password', variant: "outlined", InputProps: {
            endAdornment: (react_1.default.createElement(core_1.InputAdornment, { position: "end" },
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(core_1.IconButton, { "aria-label": translate(passwordVisible
                            ? 'ra.input.password.toggle_visible'
                            : 'ra.input.password.toggle_hidden'), onClick: setPasswordVisible }, passwordVisible ? (react_1.default.createElement(icons_1.VisibilityOff, null)) : (react_1.default.createElement(icons_1.Visibility, null))),
                    title ? (react_1.default.createElement(HtmlTooltip_1.HtmlTooltip, { className: classes.tootip, title: translate(title), placement: "right", arrow: true },
                        react_1.default.createElement(icons_1.InfoOutlined, null))) : null))),
        } }, props)));
};
exports.usePasswordVisibility = initialValue => {
    const [visible, setVisible] = react_1.useState(initialValue);
    const toggleVisibility = () => {
        setVisible(!visible);
    };
    return [visible, toggleVisibility];
};
const useStyles = core_1.makeStyles({
    tootip: {
        cursor: 'pointer',
    },
});
//# sourceMappingURL=PasswordInput.js.map