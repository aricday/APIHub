"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const Application_1 = require("./Application");
const Swagger_1 = require("./Swagger");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(),
        '& .swagger-ui .wrapper': {
            maxWidth: 'unset',
        },
    },
}));
exports.Specs = ({ record }) => {
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(Application_1.Applications, { id: record.id }),
        react_1.default.createElement(Swagger_1.Swagger, { id: record.id })));
};
//# sourceMappingURL=Specs.js.map