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
const ra_core_1 = require("ra-core");
const styles_1 = require("@material-ui/core/styles");
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const ApplicationCredentials_1 = require("./ApplicationCredentials");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        fontFamily: theme.typography.body2.fontFamily,
        padding: '0px 20px',
    },
    formControl: {
        minWidth: '240px',
    },
}));
exports.Applications = ({ id }) => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles();
    const { data, loaded, error } = ra_core_1.useGetList('applications', undefined, { field: 'name', order: 'ASC' }, {
        apiUuid: id,
    });
    const [selectedApi, setSelectedApi] = react_1.useState(null);
    const handleChange = event => {
        const selectedApiId = event.target.value;
        if (!data) {
            return;
        }
        setSelectedApi(data[selectedApiId]);
    };
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (!data || error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    const applications = Object.keys(data).map(key => data[key]);
    if (applications.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(Grid_1.default, { container: true, spacing: 3 },
            react_1.default.createElement(Grid_1.default, { item: true, xs: 7 },
                react_1.default.createElement(Typography_1.default, { variant: "h6", color: "textSecondary", gutterBottom: true }, translate('resources.apis.specification.actions.select_application')),
                react_1.default.createElement(FormControl_1.default, { className: classes.formControl },
                    react_1.default.createElement(InputLabel_1.default, { id: "select-application-label" }, translate('resources.apis.specification.fields.select_application_label')),
                    react_1.default.createElement(Select_1.default, { labelId: "select-application-label", value: selectedApi ? selectedApi.id : '', onChange: handleChange }, applications.map(({ id, name }) => (react_1.default.createElement(MenuItem_1.default, { key: id, value: id }, name)))))),
            react_1.default.createElement(Grid_1.default, { item: true, xs: 5 }, selectedApi && (react_1.default.createElement(ApplicationCredentials_1.ApplicationCredentials, { id: selectedApi.id }))))));
};
//# sourceMappingURL=Applications.js.map