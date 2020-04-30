import { promisify } from '../promisify';
import specs from '../specs.json';

export function listApis(database) {
    return async (schema, request) => {
        const { page, size, order, sort, ...filter } = request.queryParams;

        const finalPage = parseInt(request.queryParams.page, 10);
        const finalSize = parseInt(request.queryParams.size, 10);
        const finalSort = request.queryParams.sort;
        const finalOrder = request.queryParams.order?.toLowerCase() || 'asc';

        let totalElements = (await promisify(database.apis.find(filter).fetch))
            .length;
        let results = await promisify(
            database.apis.find(filter, {
                limit: finalSize,
                skip: finalSize * finalPage,
                sort: [[finalSort, finalOrder === 'asc' ? 1 : -1]],
            }).fetch
        );

        return {
            results,
            totalElements,
        };
    };
}

export function getApi(database) {
    return async (schema, request) => {
        const { ssgServiceType, ...api } = await promisify(
            database.apis.findOne.bind(database.apis),
            { uuid: request.params.id },
            {}
        );

        return {
            ...api,
            apiServiceType: ssgServiceType,
        };
    };
}

export function listApiPermissions(database) {
    return (schema, request) => {
        return {
            id: request.params.id,
            canEdit: true,
            canDelete: true,
        };
    };
}

export function getApiSpecContent(database) {
    return (schema, request) => {
        return specs;
    };
}
