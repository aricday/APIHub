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
const get_1 = __importDefault(require("lodash/get"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
exports.VisibilityField = (_a) => {
    var { basePath, record, source } = _a, props = __rest(_a, ["basePath", "record", "source"]);
    const value = get_1.default(record, source);
    const translate = ra_core_1.useTranslate();
    return (react_1.default.createElement(Typography_1.default, Object.assign({ variant: "body2" }, props), translate(`resources.apis.accessStatus.${value.toLowerCase()}`)));
};
//# sourceMappingURL=VisibilityField.js.map