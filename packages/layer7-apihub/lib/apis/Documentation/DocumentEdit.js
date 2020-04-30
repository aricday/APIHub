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
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const DocumentEditForm_1 = require("./DocumentEditForm");
const DocumentToolbar_1 = require("./DocumentToolbar");
exports.DocumentEdit = (_a) => {
    var { document, entityType, entityUuid, userCanDelete, userCanEdit, hasChildren, onAddNewDocument, onDeleteDocument } = _a, rest = __rest(_a, ["document", "entityType", "entityUuid", "userCanDelete", "userCanEdit", "hasChildren", "onAddNewDocument", "onDeleteDocument"]);
    const translate = ra_core_1.useTranslate();
    const { data, loaded, loading, error } = ra_core_1.useGetOne('documents', document.id, { action: ra_core_1.CRUD_GET_ONE });
    if (loading) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (loaded && !!(!data || error)) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DocumentToolbar_1.DocumentToolbar, { document: document, entityType: entityType, entityUuid: entityUuid, userCanEdit: userCanEdit, userCanAdd: userCanEdit, userCanDelete: userCanDelete, hasChildren: hasChildren, onAddNewDocument: onAddNewDocument, onDeleteDocument: onDeleteDocument, disabled: true }),
        react_1.default.createElement(DocumentEditForm_1.DocumentEditForm, Object.assign({ document: data }, rest))));
};
//# sourceMappingURL=DocumentEdit.js.map