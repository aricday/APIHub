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
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const format_1 = __importDefault(require("date-fns/format"));
exports.LastUpdateField = (_a) => {
    var { basePath, record, source, addPrefix } = _a, props = __rest(_a, ["basePath", "record", "source", "addPrefix"]);
    const value = get_1.default(record, source);
    const translate = ra_core_1.useTranslate();
    if (!value) {
        return null;
    }
    const date = new Date(value);
    const formattedDate = format_1.default(date, 'P');
    let label = addPrefix
        ? translate('resources.apis.last_update.fields.updated', {
            date: formattedDate,
        })
        : formattedDate;
    return (react_1.default.createElement(Tooltip_1.default, { title: format_1.default(date, 'P') },
        react_1.default.createElement(Typography_1.default, Object.assign({ variant: "body2" }, props), label)));
};
//# sourceMappingURL=LastUpdateField.js.map