"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const styles_1 = require("@material-ui/core/styles");
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
    },
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));
exports.ApplicationUsageField = ({ className, id }) => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles();
    const { data, loaded, error } = react_admin_1.useGetList('applications', undefined, { field: 'name', order: 'ASC' }, {
        apiUuid: id,
    });
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (!data || error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", className: classes.error }, translate('ra.page.error')));
    }
    return (react_1.default.createElement(Typography_1.default, { variant: "body2", className: classnames_1.default(className, classes.root) }, data && Object.keys(data).length));
};
//# sourceMappingURL=ApplicationUsageField.js.map