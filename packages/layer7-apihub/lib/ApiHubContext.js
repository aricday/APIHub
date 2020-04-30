"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const get_1 = __importDefault(require("lodash/get"));
exports.ApiHubContext = react_1.createContext();
exports.ApiHubProvider = ({ url, tenantName, children }) => {
    const value = react_1.useRef({
        url,
        urlWithApi: `${url}/api`,
        urlWithTenant: `${url}/api/${tenantName}`,
        tenantName,
    });
    return (react_1.default.createElement(exports.ApiHubContext.Provider, { value: value.current }, children));
};
exports.useApiHub = () => react_1.useContext(exports.ApiHubContext);
exports.guessApihubUrl = (location = global.window.location) => {
    return get_1.default(location, 'origin', '');
};
exports.guessApihubTenantName = (location = global.window.location) => {
    return location.host.split('.')[0];
};
//# sourceMappingURL=ApiHubContext.js.map