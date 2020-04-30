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
const get_1 = __importDefault(require("lodash/get"));
const react_admin_1 = require("react-admin");
const _1 = require(".");
const __1 = require("../");
exports.MarkdownField = (_a) => {
    var { record, source, stripTags = false, truncate } = _a, rest = __rest(_a, ["record", "source", "stripTags", "truncate"]);
    const value = get_1.default(record, source, '');
    if (stripTags) {
        const newRecord = Object.assign(Object.assign({}, record), { [source]: _1.removeTags(value) });
        return truncate ? (react_1.default.createElement(__1.TruncatedTextField, Object.assign({ record: newRecord, source: source }, rest))) : (react_1.default.createElement(react_admin_1.TextField, Object.assign({ record: newRecord, source: source }, rest)));
    }
    return react_1.default.createElement(_1.MarkdownView, Object.assign({ value: value }, rest));
};
//# sourceMappingURL=MarkdownField.js.map