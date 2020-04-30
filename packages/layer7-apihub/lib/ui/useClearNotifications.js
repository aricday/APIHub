"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ra_core_1 = require("ra-core");
const react_redux_1 = require("react-redux");
/**
 * An Hook to clear the react-admin notifications.
 *
 * @example <caption>Simple usage: clear notifications on mount</caption>
 *
 * const MyLayout = props => {
 *     const clearNotifications = useClearNotifications();
 *
 *     useEffect(() => {
 *         clearNotifications();
 *     }, [clearNotifications]);
 *
 *     return <div>{props.children}</div>;
 * };
 *
 */
exports.useClearNotifications = () => {
    const dispatch = react_redux_1.useDispatch();
    return () => dispatch(ra_core_1.hideNotification());
};
//# sourceMappingURL=useClearNotifications.js.map