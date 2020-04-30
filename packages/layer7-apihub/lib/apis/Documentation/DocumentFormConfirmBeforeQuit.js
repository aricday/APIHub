"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const react_router_dom_1 = require("react-router-dom");
exports.DocumentFormConfirmBeforeQuit = ({ when }) => {
    const translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(react_router_dom_1.Prompt, { when: when, message: () => translate('resources.documents.notifications.unsaved_changes') }));
};
//# sourceMappingURL=DocumentFormConfirmBeforeQuit.js.map