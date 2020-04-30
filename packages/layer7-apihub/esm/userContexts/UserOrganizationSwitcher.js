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
import React from 'react';
import { useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import { getUserOrganizations } from '.';
const useStyles = makeStyles(theme => ({
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
export const UserOrganizationSwitcher = (_a) => {
    var { userContext, onChangeUserContext } = _a, props = __rest(_a, ["userContext", "onChangeUserContext"]);
    const classes = useStyles(props);
    const translate = useTranslate();
    const { hasAccessibleOrgs, accessibleOrgs, activeOrg, } = getUserOrganizations(userContext);
    return hasAccessibleOrgs ? (React.createElement(React.Fragment, null,
        React.createElement(List, { compnent: "div", className: classes.root },
            React.createElement(ListSubheader, { className: classes.item }, translate('resources.userContexts.accessibleOrgs.title', {
                smart_count: accessibleOrgs.length || 0,
            })),
            accessibleOrgs.map(({ uuid, name }) => {
                const isActiveOrg = uuid === activeOrg.uuid;
                return (React.createElement(Tooltip, { key: uuid, title: name },
                    React.createElement(ListItem, { className: classes.item, "aria-label": translate(isActiveOrg
                            ? 'resources.userContexts.activeOrgUuid.status.active'
                            : 'resources.userContexts.activeOrgUuid.status.not_active'), onClick: () => onChangeUserContext({
                            activeOrgUuid: uuid,
                        }), button: !isActiveOrg },
                        React.createElement(ListItemText, { className: classes.itemText, primary: name, primaryTypographyProps: {
                                variant: 'subtitle1',
                                className: classes.truncatedText,
                            } }),
                        isActiveOrg && (React.createElement(ListItemIcon, { className: classes.icon },
                            React.createElement(CheckIcon, null))))));
            })),
        React.createElement(Divider, { className: classes.divider }))) : null;
};
//# sourceMappingURL=UserOrganizationSwitcher.js.map