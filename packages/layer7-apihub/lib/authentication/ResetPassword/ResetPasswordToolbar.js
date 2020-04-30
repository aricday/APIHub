"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const core_1 = require("@material-ui/core");
const useStyles = core_1.makeStyles({
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexBasis: '100%',
        backgroundColor: 'transparent',
        padding: 0,
    },
});
exports.ResetPasswordToolbar = props => {
    const classes = useStyles(props);
    return (react_1.default.createElement(react_admin_1.Toolbar, Object.assign({ className: classes.toolbar }, props),
        react_1.default.createElement(react_admin_1.SaveButton, { icon: react_1.default.createElement("span", null), label: "apihub.reset_password.actions.submit" })));
};
//# sourceMappingURL=ResetPasswordToolbar.js.map