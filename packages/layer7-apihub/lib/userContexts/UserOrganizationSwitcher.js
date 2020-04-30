"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const styles_1 = require("@material-ui/core/styles");
const List_1 = __importDefault(require("@material-ui/core/List"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const ListSubheader_1 = __importDefault(require("@material-ui/core/ListSubheader"));
const ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const Check_1 = __importDefault(require("@material-ui/icons/Check"));
const _1 = require(".");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        padding: `0px 0px ${theme.spacing()}px 0px`,
    },
    item: {
        color: theme.palette.text.secondary,
    },
    itemText: {
        display: 'block',
        marginTop: '0px',
        marginBottom: '0px',
        maxWidth: '300px',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '250px',
        },
    },
    truncatedText: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '300px',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '250px',
        },
    },
    secondaryText: {
        fontSize: theme.typography.caption.fontSize,
    },
    icon: {
        marginLeft: theme.spacing(2),
        minWidth: theme.spacing(3),
        color: theme.palette.success.main,
    },
    divider: {
        marginBottom: theme.spacing(),
    },
}));
exports.UserOrganizationSwitcher = (_a) => {
    var { userContext, onChangeUserContext } = _a, props = __rest(_a, ["userContext", "onChangeUserContext"]);
    const classes = useStyles(props);
    const translate = react_admin_1.useTranslate();
    const { hasAccessibleOrgs, accessibleOrgs, activeOrg, } = _1.getUserOrganizations(userContext);
    return hasAccessibleOrgs ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(List_1.default, { compnent: "div", className: classes.root },
            react_1.default.createElement(ListSubheader_1.default, { className: classes.item }, translate('resources.userContexts.accessibleOrgs.title', {
                smart_count: accessibleOrgs.length || 0,
            })),
            accessibleOrgs.map(({ uuid, name }) => {
                const isActiveOrg = uuid === activeOrg.uuid;
                return (react_1.default.createElement(Tooltip_1.default, { key: uuid, title: name },
                    react_1.default.createElement(ListItem_1.default, { className: classes.item, "aria-label": translate(isActiveOrg
                            ? 'resources.userContexts.activeOrgUuid.status.active'
                            : 'resources.userContexts.activeOrgUuid.status.not_active'), onClick: () => onChangeUserContext({
                            activeOrgUuid: uuid,
                        }), button: !isActiveOrg },
                        react_1.default.createElement(ListItemText_1.default, { className: classes.itemText, primary: name, primaryTypographyProps: {
                                variant: 'subtitle1',
                                className: classes.truncatedText,
                            } }),
                        isActiveOrg && (react_1.default.createElement(ListItemIcon_1.default, { className: classes.icon },
                            react_1.default.createElement(Check_1.default, null))))));
            })),
        react_1.default.createElement(Divider_1.default, { className: classes.divider }))) : null;
};
//# sourceMappingURL=UserOrganizationSwitcher.js.map