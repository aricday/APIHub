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
const styles_1 = require("@material-ui/core/styles");
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const useStatsStyles = styles_1.makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        width: 'auto',
    },
    icon: {
        marginRight: theme.spacing(),
    },
}));
exports.Stats = ({ children, icon, title }) => {
    const classes = useStatsStyles();
    return (react_1.default.createElement(Tooltip_1.default, { title: title },
        react_1.default.createElement(Grid_1.default, { container: true, alignItems: "center", className: classes.root },
            react_1.cloneElement(icon, {
                className: classnames_1.default(classes.icon, icon.className),
            }),
            children)));
};
exports.StatsText = ({ children }) => {
    const classes = useStatsStyles();
    return (react_1.default.createElement(Typography_1.default, { variant: "caption", color: "textSecondary", className: classes.text }, children));
};
//# sourceMappingURL=Stats.js.map