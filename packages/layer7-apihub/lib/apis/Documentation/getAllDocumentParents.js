"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllDocumentParents(document, items) {
    const getParent = document => items.find(item => item.uuid === document.parentUuid);
    let currentDocument = document;
    const parents = [];
    while (currentDocument && currentDocument.parentUuid) {
        const parent = getParent(currentDocument);
        if (parent) {
            parents.push(parent);
        }
        currentDocument = parent;
    }
    return parents;
}
exports.getAllDocumentParents = getAllDocumentParents;
//# sourceMappingURL=getAllDocumentParents.js.map