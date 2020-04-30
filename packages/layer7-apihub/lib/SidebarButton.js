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
const react_redux_1 = require("react-redux");
const classnames_1 = __importDefault(require("classnames"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
const ra_core_1 = require("ra-core");
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    closed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    open: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },
}));
exports.SidebarButton = (_a) => {
    var { open } = _a, props = __rest(_a, ["open"]);
    const classes = useStyles();
    const dispatch = react_redux_1.useDispatch();
    const translate = ra_core_1.useTranslate();
    const label = translate(open ? 'ra.actions.close_sidebar' : 'ra.actions.open_sidebar');
    return (react_1.default.createElement(core_1.Tooltip, { title: label },
        react_1.default.createElement(IconButton_1.default, Object.assign({ color: "inherit", "aria-label": label, onClick: () => dispatch(ra_core_1.toggleSidebar()), className: classnames_1.default(classes.root) }, props),
            react_1.default.createElement(Menu_1.default, { classes: {
                    root: open ? classes.open : classes.closed,
                } }))));
};
//# sourceMappingURL=SidebarButton.js.map