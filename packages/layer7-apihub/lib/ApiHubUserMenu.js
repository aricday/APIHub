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
const classnames_1 = __importDefault(require("classnames"));
const ra_core_1 = require("ra-core");
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
const styles_1 = require("@material-ui/core/styles");
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const react_router_dom_1 = require("react-router-dom");
const userContexts_1 = require("./dataProvider/userContexts");
const userContexts_2 = require("./userContexts");
const useStyles = styles_1.makeStyles(theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(),
    },
    menuItemLogout: {
        marginBottom: '0px',
    },
    divider: {
        marginBottom: theme.spacing(),
    },
    icon: {
        minWidth: theme.spacing(5),
    },
}), {
    name: 'RaUserMenu',
});
/**
 * An hook to get the path of the related list of resources
 * from the current location.
 *
 * @example <caption>Simple usage</caption>
 *
 * const MyComponent = () => {
 *     const location = useLocation();
 *     console.log(location.pathname); // Shows "/apis/uuid-of-api/show"
 *
 *     const resourceListLocation = useResourceListLocation();
 *     console.log(resourceListLocation) // Show "/apis"
 * };
 *
 */
exports.useResourceListLocation = () => {
    const location = react_router_dom_1.useLocation();
    const RESOURCE_LIST_MATCH = /\/[^/]*/;
    const match = location.pathname.match(RESOURCE_LIST_MATCH);
    return match[0];
};
/**
 * The ApiHub UserMenu used in the ApiHub AppBar.
 *
 * @param {*} props UserMenu properties
 *
 * @example <caption>Simple usage</caption>
 * <ApiHubUserMenu />
 *
 * const MyAppBar = props => <ApiHubAppBar userMenu={ApiHubUserMenu} {...props} />
 *
 */
exports.ApiHubUserMenu = props => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = react_1.useState(null);
    const redirectTo = exports.useResourceListLocation();
    const [userContext, _handleChangeUserProfile, // eslint-disable-line no-unused-vars
    handleChangeUserActiveOrg,] = userContexts_2.useUserContext(redirectTo);
    const { children, label, icon, logout } = props;
    if (!logout && !children) {
        return null;
    }
    const userName = userContext
        ? translate('apihub.menu.user_details.full_name', {
            last_name: userContext.userDetails.lastName,
            first_name: userContext.userDetails.firstName,
        })
        : '';
    const open = Boolean(anchorEl);
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Tooltip_1.default, { title: label && translate(label, { _: label }) },
            react_1.default.createElement(Button_1.default, { "aria-label": label && translate(label, { _: label }), "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", onClick: handleMenu, startIcon: icon, endIcon: react_1.default.createElement(ArrowDropDown_1.default, null), key: userName }, userName)),
        react_1.default.createElement(Menu_1.default, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, open: open, onClose: handleClose },
            react_1.default.createElement(MenuItem_1.default, { component: react_router_dom_1.Link, to: `/userContexts/${userContexts_1.CurrentUserId}`, onClick: handleClose, className: classes.menuItem },
                react_1.default.createElement(ListItemIcon_1.default, { className: classes.icon },
                    react_1.default.createElement(AccountCircle_1.default, null)),
                translate('resources.userContexts.actions.edit_profile')),
            react_1.default.createElement(Divider_1.default, { className: classes.divider }),
            react_1.default.createElement(userContexts_2.UserOrganizationSwitcher, { userContext: userContext, onChangeUserContext: handleChangeUserActiveOrg }),
            react_1.Children.map(children, menuItem => react_1.isValidElement(menuItem)
                ? react_1.cloneElement(menuItem, {
                    className: classes.menuItem,
                    onClick: handleClose,
                })
                : null),
            react_1.cloneElement(logout, {
                className: classnames_1.default(classes.menuItem, classes.menuItemLogout),
            }))));
};
exports.ApiHubUserMenu.defaultProps = {
    label: 'ra.auth.user_menu',
    icon: react_1.default.createElement(AccountCircle_1.default, null),
};
//# sourceMappingURL=ApiHubUserMenu.js.map