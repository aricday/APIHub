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
const basePath = '/tags';
const basePathApi = '/api-management/1.0/apis';
exports.tagsDataProvider = baseUrl => {
    return {
        getManyReference: async ({ id }) => {
            const url = `${baseUrl}${basePathApi}/${id}/tags`;
            const { json } = await ra_core_1.fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.map((_a) => {
                    var { uuid } = _a, item = __rest(_a, ["uuid"]);
                    return (Object.assign({ id: uuid }, item));
                }) || [],
                total: json.totalElements || 0,
            };
        },
        getList: async () => {
            const url = `${baseUrl}${basePath}`;
            const { json } = await ra_core_1.fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.map(item => (Object.assign({ id: item.name }, item))) || [],
                total: json.length,
            };
        },
        getMany: async () => {
            const url = `${baseUrl}${basePath}`;
            const { json } = await ra_core_1.fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data: json.map(item => (Object.assign({ id: item.name }, item))) || [],
                total: json.length,
            };
        },
    };
};
//# sourceMappingURL=tags.js.map