"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: 'capitalize',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(),
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
}));
exports.ViewTitle = props => {
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, Object.assign({ id: "react-admin-title", variant: "h5", component: "h2", color: "inherit", className: classes.root }, props))));
};
//# sourceMappingURL=ViewTitle.js.map