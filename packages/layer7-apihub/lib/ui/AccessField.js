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
const ra_core_1 = require("ra-core");
const classnames_1 = __importDefault(require("classnames"));
const get_1 = __importDefault(require("lodash/get"));
const styles_1 = require("@material-ui/core/styles");
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const useAccessFieldStyles = styles_1.makeStyles(theme => ({
    root: { borderRadius: theme.spacing(0.5) },
    enabled: {
        backgroundColor: theme.palette.success.main,
    },
}));
exports.AccessField = (_a) => {
    var { basePath, record, source, translationKey } = _a, props = __rest(_a, ["basePath", "record", "source", "translationKey"]);
    const value = get_1.default(record, source);
    const enabled = value === 'ENABLED';
    const color = enabled ? 'primary' : 'default';
    const classes = useAccessFieldStyles();
    const translate = ra_core_1.useTranslate();
    return (react_1.default.createElement(Chip_1.default, Object.assign({ color: color, disabled: !enabled, className: classnames_1.default(classes.root, { [classes.enabled]: enabled }), label: translate(`${translationKey}.${value.toLowerCase()}`) }, props)));
};
//# sourceMappingURL=AccessField.js.map