"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const styles_1 = require("@material-ui/core/styles");
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const get_1 = __importDefault(require("lodash/get"));
const useTruncatedTextFieldStyles = styles_1.makeStyles(theme => ({
    root: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '15vw',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '10vw',
        },
    },
}));
exports.TruncatedTextField = props => {
    const classes = useTruncatedTextFieldStyles();
    const value = get_1.default(props.record, props.source);
    return (react_1.default.createElement(Tooltip_1.default, { title: value || '' },
        react_1.default.createElement(react_admin_1.TextField, Object.assign({ className: classes.root }, props))));
};
//# sourceMappingURL=TruncatedTextField.js.map