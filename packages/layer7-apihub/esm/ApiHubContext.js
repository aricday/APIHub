import React, { createContext, useContext, useRef } from 'react';
import get from 'lodash/get';
export const ApiHubContext = createContext();
export const ApiHubProvider = ({ url, tenantName, children }) => {
    const value = useRef({
        url,
        urlWithApi: `${url}/api`,
        urlWithTenant: `${url}/api/${tenantName}`,
        tenantName,
    });
    return (React.createElement(ApiHubContext.Provider, { value: value.current }, children));
};
export const useApiHub = () => useContext(ApiHubContext);
export const guessApihubUrl = (location = global.window.location) => {
    return get(location, 'origin', '');
};
export const guessApihubTenantName = (location = global.window.location) => {
    return location.host.split('.')[0];
};
//# sourceMappingURL=ApiHubContext.js.map