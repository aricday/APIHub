"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const get_1 = __importDefault(require("lodash/get"));
const DocumentCreateForm_1 = require("./DocumentCreateForm");
const DocumentationTree_1 = require("./DocumentationTree");
const i18n_1 = require("../../i18n");
exports.createNewDocument = (title, parentDocument, allItems, entityType, entityTypeUuid, locale) => {
    const navtitle = DocumentCreateForm_1.slugifyURI(title);
    const parentUuid = get_1.default(parentDocument, 'uuid', undefined);
    const siblingsItems = DocumentationTree_1.getSiblingsDocuments(allItems, parentUuid);
    const ordinal = DocumentationTree_1.getMaxOrdinalFromDocuments(siblingsItems) + 1;
    return Object.assign(Object.assign({ id: 'new-document', type: get_1.default(parentDocument, 'type', entityType), typeUuid: get_1.default(parentDocument, 'typeUuid', entityTypeUuid), status: 'PUBLISHED', ordinal, locale: i18n_1.documentationLocales[locale] }, (parentUuid != null && { parentUuid })), { title,
        navtitle, markdown: '' });
};
exports.DocumentCreate = props => {
    return react_1.default.createElement(DocumentCreateForm_1.DocumentCreateForm, Object.assign({}, props));
};
//# sourceMappingURL=DocumentCreate.js.map