"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const documentationReducer_1 = require("./documentationReducer");
exports.useExpandedNodes = (entityUuid, locale) => {
    const dispatch = react_redux_1.useDispatch();
    const expandedNodes = react_redux_1.useSelector(react_1.useCallback(documentationReducer_1.selectExpandedNodes(entityUuid, locale), [
        entityUuid,
        locale,
    ]));
    const setExpandedNodes = react_1.useCallback(expanded => dispatch(documentationReducer_1.saveExpandedNodes(entityUuid, locale, expanded)), [dispatch, entityUuid, locale]);
    return [expandedNodes, setExpandedNodes];
};
//# sourceMappingURL=documentationTreeHooks.js.map