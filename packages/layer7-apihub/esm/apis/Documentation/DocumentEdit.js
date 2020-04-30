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
import { useGetOne, useTranslate, CRUD_GET_ONE } from 'ra-core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { DocumentEditForm } from './DocumentEditForm';
import { DocumentToolbar } from './DocumentToolbar';
export const DocumentEdit = (_a) => {
    var { document, entityType, entityUuid, userCanDelete, userCanEdit, hasChildren, onAddNewDocument, onDeleteDocument } = _a, rest = __rest(_a, ["document", "entityType", "entityUuid", "userCanDelete", "userCanEdit", "hasChildren", "onAddNewDocument", "onDeleteDocument"]);
    const translate = useTranslate();
    const { data, loaded, loading, error } = useGetOne('documents', document.id, { action: CRUD_GET_ONE });
    if (loading) {
        return React.createElement(LinearProgress, null);
    }
    if (loaded && !!(!data || error)) {
        return (React.createElement(Typography, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(DocumentToolbar, { document: document, entityType: entityType, entityUuid: entityUuid, userCanEdit: userCanEdit, userCanAdd: userCanEdit, userCanDelete: userCanDelete, hasChildren: hasChildren, onAddNewDocument: onAddNewDocument, onDeleteDocument: onDeleteDocument, disabled: true }),
        React.createElement(DocumentEditForm, Object.assign({ document: data }, rest))));
};
//# sourceMappingURL=DocumentEdit.js.map