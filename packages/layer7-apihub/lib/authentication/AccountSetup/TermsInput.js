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
const core_1 = require("@material-ui/core");
const TermsDialog_1 = require("./TermsDialog");
exports.TermsLabel = () => {
    const translate = react_admin_1.useTranslate();
    const [isOpen, setIsOpen] = react_1.useState();
    const handleOpen = event => {
        event.preventDefault();
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "body1" },
            translate('apihub.account_setup.terms_of_use_acknowledgement'),
            react_1.default.createElement(react_admin_1.Link, { to: "#", onClick: handleOpen }, translate('apihub.account_setup.terms_of_use'))),
        isOpen === true && (react_1.default.createElement(TermsDialog_1.TermsDialog, { open: isOpen, onClose: handleClose }))));
};
exports.TermsInput = (_a) => {
    var { helperText } = _a, rest = __rest(_a, ["helperText"]);
    const _b = react_admin_1.useInput(Object.assign({}, rest)), _c = _b.input, { onChange, type, value } = _c, inputProps = __rest(_c, ["onChange", "type", "value"]), { meta: { error, touched } } = _b;
    const handleChange = react_1.useCallback((_, value) => {
        onChange(value);
    }, [onChange]);
    return (react_1.default.createElement(core_1.FormGroup, null,
        react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Checkbox, Object.assign({ color: "primary", onChange: handleChange }, inputProps)), label: react_1.default.createElement(exports.TermsLabel, null), labelPlacement: "end" }),
        react_1.default.createElement(core_1.FormHelperText, { error: !!error },
            react_1.default.createElement(react_admin_1.InputHelperText, { touched: touched, error: error, helperText: helperText }))));
};
//# sourceMappingURL=TermsInput.js.map