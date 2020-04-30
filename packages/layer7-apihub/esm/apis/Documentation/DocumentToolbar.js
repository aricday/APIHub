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
import Divider from '@material-ui/core/Divider';
import IconEdit from '@material-ui/icons/Edit';
import IconDelete from '@material-ui/icons/Delete';
import IconAdd from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'ra-core';
import { DeleteDocumentButton } from './DeleteDocumentButton';
import { ChangeParentDocumentButton } from './ChangeParentDocumentButton';
/**
 * The toolbar displayed at the top of the document view
 */
export const DocumentToolbar = ({ allDocuments, disabled, document, entityType, entityUuid, locale, hasChildren, userCanEdit, userCanAdd, userCanDelete, onEdit, onAddNewDocument, onDeleteDocument, }) => {
    const classes = useToolbarStyles();
    const translate = useTranslate();
    if (!document || (!userCanEdit && !userCanDelete)) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.root },
            userCanAdd && (React.createElement(AddDocumentButton, { document: document, color: "primary", size: "small", onClick: onAddNewDocument, disabled: disabled, className: classes.button, "aria-label": translate('resources.apis.documentation.actions.new_child_document_button'), startIcon: React.createElement(IconAdd, null) }, translate('resources.apis.documentation.actions.new_child_document_button'))),
            userCanEdit && (React.createElement(Button, { color: "primary", size: "small", onClick: onEdit, disabled: disabled, className: classes.button, "aria-label": translate('resources.apis.documentation.actions.edit_document_button'), startIcon: React.createElement(IconEdit, null) }, translate('resources.apis.documentation.actions.edit_document_button'))),
            userCanEdit && (React.createElement(ChangeParentDocumentButton, { color: "primary", size: "small", disabled: disabled, className: classes.button, allDocuments: allDocuments, document: document, entityType: entityType, entityUuid: entityUuid, locale: locale })),
            userCanDelete && (React.createElement(DeleteDocumentButton, { document: document, entityType: entityType, entityUuid: entityUuid, hasChildren: hasChildren, color: "primary", size: "small", onClick: onDeleteDocument, disabled: disabled, className: classes.button, "aria-label": translate('resources.apis.documentation.actions.delete_document_button'), startIcon: React.createElement(IconDelete, null) }, translate('resources.apis.documentation.actions.delete_document_button')))),
        React.createElement(Divider, null)));
};
const AddDocumentButton = (_a) => {
    var { document, onClick } = _a, rest = __rest(_a, ["document", "onClick"]);
    const handleAddNewDocument = () => {
        onClick(document);
    };
    return React.createElement(Button, Object.assign({ onClick: handleAddNewDocument }, rest));
};
const useToolbarStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
    button: {
        '& + &': {
            marginLeft: theme.spacing(2),
        },
    },
}), { name: 'Layer7DocumentationToolbar' });
//# sourceMappingURL=DocumentToolbar.js.map