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
const react_admin_1 = require("react-admin");
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const userContexts_1 = require("../dataProvider/userContexts");
/**
 * The UserContext is a particular resource that cannot be listed,
 * and that contains only one element.
 * We perform a redirection to the edit page instead of displaying a blank page.
 */
exports.UserContextList = () => {
    const redirect = react_admin_1.useRedirect();
    react_1.useEffect(() => {
        redirect(`/userContexts/${userContexts_1.CurrentUserId}`);
    }, [redirect]);
    return react_1.default.createElement(CircularProgress_1.default, { size: 20 });
};
//# sourceMappingURL=UserContextList.js.map