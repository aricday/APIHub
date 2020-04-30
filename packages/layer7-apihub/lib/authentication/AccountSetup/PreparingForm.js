"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ra_core_1 = require("ra-core");
const core_1 = require("@material-ui/core");
const useStyles = core_1.makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(),
    },
}));
exports.PreparingForm = props => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles(props);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Typography, { variant: "body1", className: classes.root }, translate('apihub.account_setup.notifications.prepare')),
        react_1.default.createElement(core_1.LinearProgress, null)));
};
//# sourceMappingURL=PreparingForm.js.map