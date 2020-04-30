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
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const styles_1 = require("@material-ui/core/styles");
const ra_core_1 = require("ra-core");
const DeleteDocumentButton_1 = require("./DeleteDocumentButton");
const ChangeParentDocumentButton_1 = require("./ChangeParentDocumentButton");
/**
 * The toolbar displayed at the top of the document view
 */
exports.DocumentToolbar = ({ allDocuments, disabled, document, entityType, entityUuid, locale, hasChildren, userCanEdit, userCanAdd, userCanDelete, onEdit, onAddNewDocument, onDeleteDocument, }) => {
    const classes = useToolbarStyles();
    const translate = ra_core_1.useTranslate();
    if (!document || (!userCanEdit && !userCanDelete)) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.root },
            userCanAdd && (react_1.default.createElement(AddDocumentButton, { document: document, color: "primary", size: "small", onClick: onAddNewDocument, disabled: disabled, className: classes.button, "aria-label": translate('resources.apis.documentation.actions.new_child_document_button'), startIcon: react_1.default.createElement(Add_1.default, null) }, translate('resources.apis.documentation.actions.new_child_document_button'))),
            userCanEdit && (react_1.default.createElement(Button_1.default, { color: "primary", size: "small", onClick: onEdit, disabled: disabled, className: classes.button, "aria-label": translate('resources.apis.documentation.actions.edit_document_button'), startIcon: react_1.default.createElement(Edit_1.default, null) }, translate('resources.apis.documentation.actions.edit_document_button'))),
            userCanEdit && (react_1.default.createElement(ChangeParentDocumentButton_1.ChangeParentDocumentButton, { color: "primary", size: "small", disabled: disabled, className: classes.button, allDocuments: allDocuments, document: document, entityType: entityType, entityUuid: entityUuid, locale: locale })),
            userCanDelete && (react_1.default.createElement(DeleteDocumentButton_1.DeleteDocumentButton, { document: document, entityType: entityType, entityUuid: entityUuid, hasChildren: hasChildren, color: "primary", size: "small", onClick: onDeleteDocument, disabled: disabled, className: classes.button, "aria-label": translate('resources.apis.documentation.actions.delete_document_button'), startIcon: react_1.default.createElement(Delete_1.default, null) }, translate('resources.apis.documentation.actions.delete_document_button')))),
        react_1.default.createElement(Divider_1.default, null)));
};
const AddDocumentButton = (_a) => {
    var { document, onClick } = _a, rest = __rest(_a, ["document", "onClick"]);
    const handleAddNewDocument = () => {
        onClick(document);
    };
    return react_1.default.createElement(Button_1.default, Object.assign({ onClick: handleAddNewDocument }, rest));
};
const useToolbarStyles = styles_1.makeStyles(theme => ({
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