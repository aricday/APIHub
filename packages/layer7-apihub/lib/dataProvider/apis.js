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
Object.defineProperty(exports, "__esModule", { value: true });
const ra_core_1 = require("ra-core");
const query_string_1 = require("query-string");
const basePath = '/api-management/1.0/apis';
const adminBasePath = '/api-management/internal';
const SearchFields = ['name', 'description'];
exports.apisDataProvider = (apiUrl, adminUrl) => {
    return {
        getList: async ({ filter, pagination, sort }) => {
            const url = `${apiUrl}${basePath}?${query_string_1.stringify(Object.assign(Object.assign({}, exports.getFilter(filter)), { page: pagination.page - 1, size: pagination.perPage, sort: `${sort.field},${sort.order}` }))}`;
            const { json } = await ra_core_1.fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.results.map((_a) => {
                    var { uuid } = _a, item = __rest(_a, ["uuid"]);
                    return (Object.assign(Object.assign({}, item), { id: uuid }));
                }) || [],
                total: json.totalElements || 0,
            };
        },
        getOne: async ({ id }) => {
            const url = `${apiUrl}${basePath}/${id}`;
            const _a = (await ra_core_1.fetchUtils.fetchJson(url, { credentials: 'include' })).json, { uuid } = _a, data = __rest(_a, ["uuid"]);
            return {
                data: Object.assign(Object.assign({}, data), { id: uuid }),
            };
        },
        getPermissions: async ({ id }) => {
            const url = `${adminUrl}${adminBasePath}/permissions/apis/${id}/permitted`;
            const { json: data } = await ra_core_1.fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: Object.assign(Object.assign({}, data), { id }),
            };
        },
    };
};
exports.getFilter = (_a, searchFields = SearchFields) => {
    var { q } = _a, filters = __rest(_a, ["q"]);
    let result = filters;
    if (!q) {
        return filters;
    }
    // The API does not support the `q` field for fulltext search.
    // Instead, we must add a filter for each searchable field supported by this resource
    if (!searchFields || searchFields.length === 0) {
        return result;
    }
    return searchFields.reduce((acc, field) => {
        acc[field] = q;
        return acc;
    }, Object.assign({}, filters));
};
//# sourceMappingURL=apis.js.map