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
const react_admin_1 = require("react-admin");
const ViewTitle_1 = require("./ViewTitle");
const preferences_1 = require("../preferences");
const Pagination = props => {
    const { resource, perPage, setPerPage } = props;
    const [perPagePreference, setPerPagePreference] = preferences_1.useApiHubPreference(`perPage/${resource}`, perPage);
    react_1.useEffect(() => {
        if (perPagePreference !== perPage) {
            setPerPage(perPagePreference);
        }
    }, [perPage, perPagePreference, setPerPage]);
    const handleSetPerPage = newPerPage => {
        setPerPagePreference(newPerPage);
    };
    return (react_1.default.createElement(react_admin_1.Pagination, Object.assign({}, props, { perPage: parseInt(perPagePreference, 10), setPerPage: handleSetPerPage })));
};
/**
 * A List component which displays the react-admin list with the title above.
 *
 * @param {*} props The react-admin list properties
 *
 */
exports.List = props => {
    const { resource, perPage } = props;
    // Get the initial per page preference per resources
    // The readApiHubPreference method is used
    // instead of the useApiHubPreference hook
    // to not rerender the whole list each time the perPage property changes.
    // See the <Pagination /> component above to understand the complete usage of the per page preferences.
    const perPagePreference = preferences_1.readApiHubPreference(`perPage/${resource}`, perPage);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ViewTitle_1.ViewTitle, null),
        react_1.default.createElement(react_admin_1.List, Object.assign({}, props, { perPage: parseInt(perPagePreference, 10), pagination: react_1.default.createElement(Pagination, null) }))));
};
//# sourceMappingURL=List.js.map