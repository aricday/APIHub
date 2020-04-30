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
const pure_1 = __importDefault(require("recompose/pure"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
exports.LinkField = pure_1.default((_a) => {
    var { addLabel, className, source, record = {} } = _a, rest = __rest(_a, ["addLabel", "className", "source", "record"]);
    return (react_1.default.createElement(Link_1.default, Object.assign({ className: className, href: get_1.default(record, source) }, rest), get_1.default(record, source)));
});
exports.LinkField.defaultProps = {
    addLabel: true,
};
exports.LinkField.displayName = 'LinkField';
exports.default = exports.LinkField;
//# sourceMappingURL=LinkField.js.map