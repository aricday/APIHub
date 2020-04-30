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
const styles_1 = require("@material-ui/core/styles");
const computeDatagridPadding = (theme, props) => props && props.size === 'small'
    ? `${theme.spacing(0.5)}px ${theme.spacing(3)}px`
    : `${theme.spacing(1)}px ${theme.spacing(3)}px`;
const useStyles = styles_1.makeStyles(theme => ({
    headerCell: {
        backgroundColor: theme.palette.action.selected,
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'uppercase',
    },
    rowCell: {
        padding: props => computeDatagridPadding(theme, props),
    },
}));
exports.Datagrid = props => {
    const theme = styles_1.useTheme();
    const classes = useStyles(props);
    // HACK: For some reason, the header cells loses their styles when dynamically
    // changing the theme. Passing a new key when changing the theme fixes that
    const key = react_1.useMemo(() => Math.random(), [theme]); // eslint-disable-line
    return react_1.default.createElement(react_admin_1.Datagrid, Object.assign({ key: key, classes: classes }, props));
};
//# sourceMappingURL=Datagrid.js.map