"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ApiHubContext_1 = require("../ApiHubContext");
exports.fetchResetPassword = async (url, username) => {
    const response = await fetch(`${url}/admin/Portal.svc/ResetMyPassword()?Username='${username}'`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }
    return await response.json();
};
exports.useResetPassword = () => {
    const { url } = ApiHubContext_1.useApiHub();
    const [username, setUsername] = react_1.useState('');
    const [fetched, setFetched] = react_1.useState(false);
    react_1.useEffect(() => {
        if (!fetched && username !== '') {
            exports.fetchResetPassword(url, username).then(() => {
                setFetched(true);
            });
        }
    }, [url, fetched, username]);
    return [username, setUsername];
};
//# sourceMappingURL=useResetPassword.js.map