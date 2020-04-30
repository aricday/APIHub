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
import { stringify } from 'query-string';
const basePath = '/api-management/1.0/applications';
const basePath2 = '/api-management/0.1/applications';
export const applicationsDataProvider = baseUrl => {
    return {
        getManyReference: async ({ pagination = { page: 1, perPage: 25 }, filter: { id }, }) => {
            const url = `${baseUrl}${basePath}?${stringify({
                apiUuid: id,
                page: pagination.page - 1,
                size: pagination.perPage,
            })}`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.results.map((_a) => {
                    var { uuid } = _a, item = __rest(_a, ["uuid"]);
                    return (Object.assign({ id: uuid }, item));
                }) || [],
                total: json.totalElements || 0,
            };
        },
        getList: async ({ filter = {}, pagination = { page: 1, perPage: 25 }, sort = null, }) => {
            const url = `${baseUrl}${basePath}?${stringify(Object.assign(Object.assign(Object.assign({}, filter), { page: pagination.page - 1, size: pagination.perPage }), (sort && { sort: `${sort.field},${sort.order}` })))}`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.results.map((_a) => {
                    var { uuid } = _a, item = __rest(_a, ["uuid"]);
                    return (Object.assign({ id: uuid }, item));
                }) || [],
                total: json.totalElements || 0,
            };
        },
        getOne: async ({ id }) => {
            const url = `${baseUrl}${basePath2}/${id}`;
            const _a = (await fetchUtils.fetchJson(url, { credentials: 'include' })).json, { uuid } = _a, data = __rest(_a, ["uuid"]);
            return {
                data: Object.assign({ id: uuid }, data),
            };
        },
    };
};
//# sourceMappingURL=applications.js.map