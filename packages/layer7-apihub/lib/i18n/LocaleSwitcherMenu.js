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
const styles_1 = require("@material-ui/core/styles");
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const classnames_1 = __importDefault(require("classnames"));
const useStyles = styles_1.makeStyles({
    button: {
        textTransform: 'none',
    },
}, { name: 'Layer7LocaleSwitcherMenu' });
exports.LocaleSwitcherMenu = props => {
    const [anchorEl, setAnchorEl] = react_1.useState(null);
    const { onChange, locale, locales, className } = props, rest = __rest(props, ["onChange", "locale", "locales", "className"]);
    const classes = useStyles(props);
    const open = Boolean(anchorEl);
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleSetLocale = newLocale => {
        onChange(newLocale);
        handleClose();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.default, Object.assign({ "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", variant: "text", className: classnames_1.default(classes.button, className), onClick: handleMenu, endIcon: react_1.default.createElement(ArrowDropDown_1.default, null) }, rest), locales[locale]),
        react_1.default.createElement(Menu_1.default, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, open: open, onClose: handleClose }, Object.keys(locales).map(key => (react_1.default.createElement(exports.LocaleSwitcherMenuItem, { key: key, locale: key, onSetLocale: handleSetLocale }, locales[key]))))));
};
exports.LocaleSwitcherMenuItem = react_1.forwardRef((_a, ref) => {
    var { locale, onSetLocale } = _a, props = __rest(_a, ["locale", "onSetLocale"]);
    return (react_1.default.createElement(MenuItem_1.default, Object.assign({ ref: ref, onClick: () => onSetLocale(locale) }, props)));
});
//# sourceMappingURL=LocaleSwitcherMenu.js.map