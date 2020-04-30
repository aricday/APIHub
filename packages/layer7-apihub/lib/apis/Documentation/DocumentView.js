"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const get_1 = __importDefault(require("lodash/get"));
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const documents_1 = require("../../dataProvider/documents");
const ui_1 = require("../../ui");
const DocumentToolbar_1 = require("./DocumentToolbar");
const useStyles = styles_1.makeStyles(theme => ({
    markdown: {
        padding: theme.spacing(2),
    },
}));
exports.DocumentView = ({ allDocuments, document, entityType, entityUuid, locale, userCanEdit, userCanDelete, hasChildren, onEdit, onAddNewDocument, onDeleteDocument, }) => {
    const translate = react_admin_1.useTranslate();
    const classes = useStyles();
    const documentId = documents_1.buildDocumentId(entityType, entityUuid, document.navtitle, document.locale);
    const { data, loaded, loading, error } = react_admin_1.useGetOne('documents', documentId, { action: react_admin_1.CRUD_GET_ONE });
    if (loading) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (loaded && !!(!data || error)) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DocumentToolbar_1.DocumentToolbar, { allDocuments: allDocuments, document: document, entityType: entityType, entityUuid: entityUuid, userCanEdit: userCanEdit, userCanAdd: userCanEdit, userCanDelete: userCanDelete, hasChildren: hasChildren, onEdit: onEdit, onAddNewDocument: onAddNewDocument, onDeleteDocument: onDeleteDocument, locale: locale }),
        react_1.default.createElement(ui_1.MarkdownView, { className: classes.markdown, value: get_1.default(data, 'markdown', '') })));
};
//# sourceMappingURL=DocumentView.js.map