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
import { fetchUtils } from 'ra-core';
const basePath = '/document-service/0.1';
export const buildDocumentId = (entityType, entityUuid, navtitle, locale) => {
    // The document API does not follow the usual REST convention
    // To make it work with react admin, we build an ID which will be destructured
    // in the dataProvider
    return `${entityType}/${entityUuid}/${navtitle}/${locale}`;
};
/**
 * Prepare data to create a document
 * Filtered params are: id, uuid, children
 * Conserved params are: type, typeUuid, locale, parentUuid, status, title, navtitle, markdown, ordinal, modifyTs
 */
const prepareCreateData = (_a) => {
    var { id, uuid, children } = _a, rest = __rest(_a, ["id", "uuid", "children"]);
    return JSON.stringify(rest);
};
/**
 * Prepare data to update a document
 * Filtered params are: id, children
 * Conserved params are: uuid, type, typeUuid, locale, parentUuid, status, title, navtitle, markdown, ordinal, modifyTs
 */
const prepareUpdateData = (_a) => {
    var { id, children } = _a, rest = __rest(_a, ["id", "children"]);
    return JSON.stringify(rest);
};
export const documentsDataProvider = baseUrl => {
    return {
        getList: async ({ filter }) => {
            const { entityType, entityUuid, locale, fetchTree = true } = filter;
            const url = `${baseUrl}${basePath}/${entityType}/${entityUuid}/docs/${fetchTree ? 'tree' : ''}?locale=${locale}`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.map(item => (Object.assign(Object.assign({}, item), { id: buildDocumentId(entityType, entityUuid, item.navtitle, locale) }))),
                total: json.length,
            };
        },
        getOne: async ({ id }) => {
            const [entityType, entityUuid, navtitle, locale] = id.split('/');
            const url = `${baseUrl}${basePath}/${entityType}/${entityUuid}/docs/${encodeURIComponent(navtitle)}?locale=${locale}`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: Object.assign(Object.assign({}, json), { id: buildDocumentId(entityType, entityUuid, json.navtitle, json.locale) }),
            };
        },
        create: async (_a) => {
            var _b = _a.data, { id } = _b, body = __rest(_b, ["id"]);
            const [entityType, entityUuid] = id.split('/');
            const url = `${baseUrl}${basePath}/${entityType}/${entityUuid}/docs`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
                method: 'POST',
                body: prepareCreateData(body),
            });
            return {
                data: Object.assign(Object.assign({}, json), { id: buildDocumentId(entityType, entityUuid, json.navtitle, json.locale) }),
            };
        },
        update: async (_a) => {
            var _b = _a.data, { id } = _b, body = __rest(_b, ["id"]);
            const [entityType, entityUuid, navtitle, locale] = id.split('/');
            const url = `${baseUrl}${basePath}/${entityType}/${entityUuid}/docs/${encodeURIComponent(navtitle)}?locale=${locale}`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
                method: 'PUT',
                body: prepareUpdateData(body),
            });
            return {
                data: Object.assign(Object.assign({}, json), { id: buildDocumentId(entityType, entityUuid, json.navtitle, json.locale) }),
            };
        },
        updateTree: async ({ entityType, entityUuid, locale, data }) => {
            const url = `${baseUrl}${basePath}/${entityType}/${entityUuid}/docs/tree?locale=${locale}`;
            const { json } = await fetchUtils.fetchJson(url, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(data),
            });
            return { data: json };
        },
        delete: async ({ id }) => {
            const [entityType, entityUuid, navtitle, locale] = id.split('/');
            const url = `${baseUrl}${basePath}/${entityType}/${entityUuid}/docs/${encodeURIComponent(navtitle)}?locale=${locale}&forceDelete=true`;
            const data = __rest((await fetchUtils.fetchJson(url, {
                credentials: 'include',
                method: 'DELETE',
            })).json, []);
            return {
                data: Object.assign(Object.assign({}, data), { id: buildDocumentId(entityType, entityUuid, data.navtitle, data.locale) }),
            };
        },
    };
};
//# sourceMappingURL=documents.js.map