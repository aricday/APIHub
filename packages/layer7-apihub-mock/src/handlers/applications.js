import { promisify } from '../promisify';

export function listApplications(database) {
    return async (schema, request) => {
        const {
            page,
            size,
            order,
            sort,
            apiUuid,
            $select,
            ...filter
        } = request.queryParams;

        const finalPage = parseInt(request.queryParams.page, 10);
        const finalSize = parseInt(request.queryParams.size, 10);
        const finalSort = request.queryParams.sort;
        const finalOrder = request.queryParams.order?.toLowerCase() || 'asc';

        const finalFilter = {
            ...filter,
        };

        if (apiUuid) {
            finalFilter._accessibleApis = apiUuid;
        }

        let totalElements = (
            await promisify(database.applications.find(finalFilter).fetch)
        ).length;
        let results = await promisify(
            database.applications.find(finalFilter, {
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
