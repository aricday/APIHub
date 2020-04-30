import React from 'react';
import get from 'lodash/get';
import { DocumentCreateForm, slugifyURI } from './DocumentCreateForm';
import { getMaxOrdinalFromDocuments, getSiblingsDocuments, } from './DocumentationTree';
import { documentationLocales } from '../../i18n';
export const createNewDocument = (title, parentDocument, allItems, entityType, entityTypeUuid, locale) => {
    const navtitle = slugifyURI(title);
    const parentUuid = get(parentDocument, 'uuid', undefined);
    const siblingsItems = getSiblingsDocuments(allItems, parentUuid);
    const ordinal = getMaxOrdinalFromDocuments(siblingsItems) + 1;
    return Object.assign(Object.assign({ id: 'new-document', type: get(parentDocument, 'type', entityType), typeUuid: get(parentDocument, 'typeUuid', entityTypeUuid), status: 'PUBLISHED', ordinal, locale: documentationLocales[locale] }, (parentUuid != null && { parentUuid })), { title,
        navtitle, markdown: '' });
};
export const DocumentCreate = props => {
    return React.createElement(DocumentCreateForm, Object.assign({}, props));
};
//# sourceMappingURL=DocumentCreate.js.map