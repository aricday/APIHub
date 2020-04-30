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
const basePath = '/2.0/Apis';
export const specsDataProvider = baseUrl => {
    return {
        getOne: async ({ id }) => {
            const url = `${baseUrl}${basePath}('${id}')/SpecContent`;
            const data = __rest((await fetchUtils.fetchJson(url, { credentials: 'include' })).json, []);
            return {
                data: Object.assign({ id }, data),
            };
        },
    };
};
//# sourceMappingURL=specs.js.map