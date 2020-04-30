"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
const set_1 = __importDefault(require("lodash/set"));
const redux_1 = require("redux");
exports.SAVE_EXPANDED_NODES = '@layer7/SAVE_EXPANDED_NODES';
exports.ADD_EXPANDED_NODES = '@layer7/ADD_EXPANDED_NODES';
exports.DOCUMENT_ADDED = '@layer7/DOCUMENT_ADDED';
exports.documentationTreeReducer = (previousState = {}, { type, payload }) => {
    if (!payload || !payload.entityUuid || !payload.locale) {
        return previousState;
    }
    switch (type) {
        case exports.SAVE_EXPANDED_NODES: {
            const newState = Object.assign({}, previousState);
            return set_1.default(newState, `${payload.entityUuid}[${payload.locale}]`, payload.expandedNodes);
        }
        case exports.ADD_EXPANDED_NODES: {
            const newExpandedNodes = new Set(get_1.default(previousState, `${payload.entityUuid}[${payload.locale}]`, []));
            payload.nodeIds.forEach(id => newExpandedNodes.add(id));
            const newState = Object.assign({}, previousState);
            return set_1.default(newState, `${payload.entityUuid}[${payload.locale}]`, Array.from(newExpandedNodes));
        }
        default:
            return previousState;
    }
};
exports.newDocument = (previousState = null, { type, payload }) => {
    switch (type) {
        case exports.DOCUMENT_ADDED:
            return payload;
        default:
            return previousState;
    }
};
exports.documentationReducer = {
    documentation: redux_1.combineReducers({
        documentationTree: exports.documentationTreeReducer,
        newDocument: exports.newDocument,
    }),
};
// Tree
exports.saveExpandedNodes = (entityUuid, locale, expandedNodes) => ({
    type: exports.SAVE_EXPANDED_NODES,
    payload: { entityUuid, locale, expandedNodes },
});
exports.addExpandedNodes = (entityUuid, locale, nodeIds) => ({
    type: exports.ADD_EXPANDED_NODES,
    payload: { entityUuid, locale, nodeIds },
});
exports.selectExpandedNodes = (entityUuid, locale) => state => get_1.default(state, `documentation.documentationTree.${entityUuid}.${locale}`, []);
// New Document
exports.addNewDocument = document => ({
    type: exports.DOCUMENT_ADDED,
    payload: document,
});
exports.removeNewDocument = () => ({
    type: exports.DOCUMENT_ADDED,
    payload: null,
});
exports.getNewDocument = state => state.documentation.newDocument;
//# sourceMappingURL=documentationReducer.js.map