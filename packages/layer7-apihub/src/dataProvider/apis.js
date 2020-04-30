import { fetchUtils } from 'ra-core';
import { stringify } from 'query-string';

const basePath = '/api-management/1.0/apis';
const adminBasePath = '/api-management/internal';
const apisPath = '/2.0/Apis';

const SearchFields = ['name', 'description'];
export const apisDataProvider = (apiUrl, adminUrl) => {
    return {
        getList: async ({ filter, pagination, sort }) => {
            const url = `${apiUrl}${basePath}?${stringify({
                ...getFilter(filter),
                page: pagination.page - 1,
                size: pagination.perPage,
                sort: `${sort.field},${sort.order}`,
            })}`;

            const { json } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });

            return {
                data:
                    json.results.map(({ uuid, ...item }) => ({
                        ...item,
                        id: uuid,
                    })) || [],
                total: json.totalElements || 0,
            };
        },

        getOne: async ({ id }) => {
            const url = `${apiUrl}${basePath}/${id}`;

            const {
                json: { uuid, ...data },
            } = await fetchUtils.fetchJson(url, { credentials: 'include' });

            return {
                data: { ...data, id: uuid },
            };
        },

        getPermissions: async ({ id }) => {
            const url = `${adminUrl}${adminBasePath}/permissions/apis/${id}/permitted`;

            const { json: data } = await fetchUtils.fetchJson(url, {
                credentials: 'include',
            });

            return {
                data: {
                    ...data,
                    id,
                },
            };
        },
        getApis: async () => {
            const url = `${apiUrl}${apisPath}`;
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

export const getFilter = ({ q, ...filters }, searchFields = SearchFields) => {
    let result = filters;

    if (!q) {
        return filters;
    }

    // The API does not support the `q` field for fulltext search.
    // Instead, we must add a filter for each searchable field supported by this resource
    if (!searchFields || searchFields.length === 0) {
        return result;
    }

    return searchFields.reduce(
        (acc, field) => {
            acc[field] = q;
            return acc;
        },
        { ...filters }
    );
};
