import { fetchUtils } from 'ra-core';
import { stringify } from 'query-string';

const basePath = '/api-management/1.0/applications';
const basePath2 = '/api-management/0.1/applications';
const legacyPath = '/Applications';
const apisListPath = '/2.0/Apis';

export const applicationsDataProvider = baseUrl => {
    return {
        getManyReference: async ({
            pagination = { page: 1, perPage: 25 },
            filter: { id },
        }) => {
            const url = `${baseUrl}${basePath}?${stringify({
                apiUuid: id,
                page: pagination.page - 1,
                size: pagination.perPage,
            })}`;

            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });

            return {
                data:
                    json.results.map(({ uuid, ...item }) => ({
                        id: uuid,
                        ...item,
                    })) || [],
                total: json.totalElements || 0,
            };
        },

        getList: async ({
            filter = {},
            pagination = { page: 1, perPage: 25 },
            sort = null,
        }) => {
            const url = `${baseUrl}${basePath}?${stringify({
                ...filter,
                page: pagination.page - 1,
                size: pagination.perPage,
                ...(sort && { sort: `${sort.field},${sort.order}` }),
            })}`;

            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });

            return {
                data:
                    json.results.map(({ uuid, ...item }) => ({
                        id: uuid,
                        ...item,
                    })) || [],
                total: json.totalElements || 0,
            };
        },

        getOne: async ({ id }) => {
            const url = `${baseUrl}${legacyPath}('${id}')`;

            const {
                json: { Uuid, ...data },
            } = await fetchUtils.fetchJson(url, { credentials: 'include' });
            return {
                data: { id: Uuid, ...data },
            };
        },

        getApplicationApis: async () => {
            const url = `${baseUrl}${apisListPath}`;
            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });
            return {
                data:
                    json.map(item => ({
                        id: item.Uuid,
                        ...item,
                    })) || [],
                total: json.length || 0,
            };
        },
    };
};
