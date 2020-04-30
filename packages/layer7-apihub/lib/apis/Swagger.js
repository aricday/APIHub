"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const swagger_ui_react_1 = __importDefault(require("swagger-ui-react"));
require("swagger-ui-react/swagger-ui.css");
const core_1 = require("@material-ui/core");
const useStyles = core_1.makeStyles(theme => ({
    swagger: {
        backgroundColor: theme.palette.common.white,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
}));
exports.Swagger = ({ id }) => {
    const translate = react_admin_1.useTranslate();
    const classes = useStyles();
    const { data, loaded, error } = react_admin_1.useGetOne('specs', id);
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (!data || error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    return (react_1.default.createElement("div", { className: classes.swagger },
        react_1.default.createElement(swagger_ui_react_1.default, { spec: data })));
};
//# sourceMappingURL=Swagger.js.map