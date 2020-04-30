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
import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import classnames from 'classnames';
const useStyles = makeStyles({
    button: {
        textTransform: 'none',
    },
}, { name: 'Layer7LocaleSwitcherMenu' });
export const LocaleSwitcherMenu = props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { onChange, locale, locales, className } = props, rest = __rest(props, ["onChange", "locale", "locales", "className"]);
    const classes = useStyles(props);
    const open = Boolean(anchorEl);
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleSetLocale = newLocale => {
        onChange(newLocale);
        handleClose();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, Object.assign({ "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", variant: "text", className: classnames(classes.button, className), onClick: handleMenu, endIcon: React.createElement(ArrowDropDownIcon, null) }, rest), locales[locale]),
        React.createElement(Menu, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, open: open, onClose: handleClose }, Object.keys(locales).map(key => (React.createElement(LocaleSwitcherMenuItem, { key: key, locale: key, onSetLocale: handleSetLocale }, locales[key]))))));
};
export const LocaleSwitcherMenuItem = forwardRef((_a, ref) => {
    var { locale, onSetLocale } = _a, props = __rest(_a, ["locale", "onSetLocale"]);
    return (React.createElement(MenuItem, Object.assign({ ref: ref, onClick: () => onSetLocale(locale) }, props)));
});
//# sourceMappingURL=LocaleSwitcherMenu.js.map