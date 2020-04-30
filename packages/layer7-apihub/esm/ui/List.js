import React, { useEffect } from 'react';
import { List as RaList, Pagination as RaPagination } from 'react-admin';
import { ViewTitle } from './ViewTitle';
import { useApiHubPreference, readApiHubPreference } from '../preferences';
const Pagination = props => {
    const { resource, perPage, setPerPage } = props;
    const [perPagePreference, setPerPagePreference] = useApiHubPreference(`perPage/${resource}`, perPage);
    useEffect(() => {
        if (perPagePreference !== perPage) {
            setPerPage(perPagePreference);
        }
    }, [perPage, perPagePreference, setPerPage]);
    const handleSetPerPage = newPerPage => {
        setPerPagePreference(newPerPage);
    };
    return (React.createElement(RaPagination, Object.assign({}, props, { perPage: parseInt(perPagePreference, 10), setPerPage: handleSetPerPage })));
};
/**
 * A List component which displays the react-admin list with the title above.
 *
 * @param {*} props The react-admin list properties
 *
 */
export const List = props => {
    const { resource, perPage } = props;
    // Get the initial per page preference per resources
    // The readApiHubPreference method is used
    // instead of the useApiHubPreference hook
    // to not rerender the whole list each time the perPage property changes.
    // See the <Pagination /> component above to understand the complete usage of the per page preferences.
    const perPagePreference = readApiHubPreference(`perPage/${resource}`, perPage);
    return (React.createElement(React.Fragment, null,
        React.createElement(ViewTitle, null),
        React.createElement(RaList, Object.assign({}, props, { perPage: parseInt(perPagePreference, 10), pagination: React.createElement(Pagination, null) }))));
};
//# sourceMappingURL=List.js.map