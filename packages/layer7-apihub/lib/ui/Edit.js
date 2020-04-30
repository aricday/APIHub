"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const ViewTitle_1 = require("./ViewTitle");
exports.Edit = props => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ViewTitle_1.ViewTitle, null),
    react_1.default.createElement(react_admin_1.Edit, Object.assign({}, props))));
//# sourceMappingURL=Edit.js.map