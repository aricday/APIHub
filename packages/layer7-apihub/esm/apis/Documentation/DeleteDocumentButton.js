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
import React from 'react';
import Button from '@material-ui/core/Button';
import { CRUD_DELETE, useDelete, useNotify, useTranslate, useRefresh, } from 'ra-core';
export const DeleteDocumentButton = (_a) => {
    var { document, entityType, entityUuid, hasChildren, onClick } = _a, rest = __rest(_a, ["document", "entityType", "entityUuid", "hasChildren", "onClick"]);
    const translate = useTranslate();
    const notify = useNotify();
    const refresh = useRefresh();
    const [deleteDocument] = useDelete('documents', document.id, document, {
        action: CRUD_DELETE,
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
    return React.createElement(Button, Object.assign({ onClick: handleDeleteDocument }, rest));
};
//# sourceMappingURL=DeleteDocumentButton.js.map