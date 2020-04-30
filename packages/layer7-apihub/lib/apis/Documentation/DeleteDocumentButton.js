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
const ra_core_1 = require("ra-core");
exports.DeleteDocumentButton = (_a) => {
    var { document, entityType, entityUuid, hasChildren, onClick } = _a, rest = __rest(_a, ["document", "entityType", "entityUuid", "hasChildren", "onClick"]);
    const translate = ra_core_1.useTranslate();
    const notify = ra_core_1.useNotify();
    const refresh = ra_core_1.useRefresh();
    const [deleteDocument] = ra_core_1.useDelete('documents', document.id, document, {
        action: ra_core_1.CRUD_DELETE,
        onSuccess: () => {
            notify('resources.documents.notifications.delete_success', 'info', {
                smart_count: 1,
            });
            refresh();
            onClick();
        },
        onFailure: () => {
            notify('resources.documents.notifications.delete_error', 'warning');
        },
    });
    const handleDeleteDocument = () => {
        const shouldDelete = global.window.confirm(hasChildren
            ? translate('resources.apis.documentation.confirm_delete_document_with_children')
            : translate('resources.apis.documentation.confirm_delete_document_without_children'));
        if (shouldDelete) {
            deleteDocument();
        }
    };
    return react_1.default.createElement(Button_1.default, Object.assign({ onClick: handleDeleteDocument }, rest));
};
//# sourceMappingURL=DeleteDocumentButton.js.map