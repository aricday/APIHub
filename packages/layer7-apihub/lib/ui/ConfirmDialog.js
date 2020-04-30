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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
exports.ConfirmDialog = (_a) => {
    var { title, content, buttonConfirm, buttonCancel, open = false, onConfirm = () => { }, onCancel = () => { } } = _a, rest = __rest(_a, ["title", "content", "buttonConfirm", "buttonCancel", "open", "onConfirm", "onCancel"]);
    return (react_1.default.createElement(Dialog_1.default, Object.assign({ maxWidth: "xs", "aria-labelledby": "confirmation-dialog-title", open: open, onClose: onCancel }, rest),
        react_1.default.createElement(DialogTitle_1.default, { id: "confirmation-dialog-title" }, title),
        react_1.default.createElement(DialogContent_1.default, { dividers: true }, content),
        react_1.default.createElement(DialogActions_1.default, null,
            react_1.default.createElement(Button_1.default, { autoFocus: true, onClick: onCancel, variant: "outlined", color: "secondary" }, buttonConfirm),
            react_1.default.createElement(Button_1.default, { onClick: onConfirm, variant: "contained", color: "primary" }, buttonCancel))));
};
//# sourceMappingURL=ConfirmDialog.js.map