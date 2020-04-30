"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const preferences_1 = require("../../preferences");
exports.ListDisplayContext = react_1.createContext();
exports.LIST_DISPLAY_CARDS = 'cards';
exports.LIST_DISPLAY_DATAGRID = 'datagrid';
exports.ListDisplayProvider = ({ children, preferenceName = 'listDisplay', initialListDisplay = exports.LIST_DISPLAY_CARDS, }) => {
    const value = preferences_1.useApiHubPreference(preferenceName, initialListDisplay);
    return (react_1.default.createElement(exports.ListDisplayContext.Provider, { value: value }, children));
};
exports.useListDisplay = () => {
    const context = react_1.useContext(exports.ListDisplayContext);
    if (context === undefined) {
        throw new Error('useListDisplay must be used within a ListDisplayProvider');
    }
    return context;
};
//# sourceMappingURL=ListDisplayContext.js.map