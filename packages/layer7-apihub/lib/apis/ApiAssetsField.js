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
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const List_1 = __importDefault(require("@material-ui/core/List"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const styles_1 = require("@material-ui/core/styles");
const get_1 = __importDefault(require("lodash/get"));
const ApiHubContext_1 = require("../ApiHubContext");
const useStyles = styles_1.makeStyles(theme => ({
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(),
    },
}));
const DownloadButton = react_1.forwardRef((props, ref) => (react_1.default.createElement(Button_1.default, Object.assign({ variant: "outlined", color: "primary", ref: ref }, props))));
const DownloadFilesButton = ({ id }) => {
    const translate = ra_core_1.useTranslate();
    const { urlWithTenant } = ApiHubContext_1.useApiHub();
    const href = `${urlWithTenant}/api-management/1.0/apis/${id}/assets/archive`;
    const label = translate('resources.apis.overview.actions.download_assets');
    return (react_1.default.createElement(Link_1.default, { component: DownloadButton, href: href, download: "assets.zip", "aria-label": label }, label));
};
exports.ApiAssetsField = ({ id }) => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles();
    const { data, loaded, error } = ra_core_1.useGetManyReference('assets', 'id', id, undefined, undefined, undefined, 'apis');
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body1", className: classes.error }, translate('ra.page.error')));
    }
    if (!data) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body1" }, translate('resources.apis.overview.notifications.no_assets')));
    }
    const links = Object.keys(data).map(key => {
        const { id, name, type, links } = data[key];
        return {
            id,
            name,
            type: type,
            href: get_1.default(links, '[0].href', null),
            rel: get_1.default(links, '[0].rel', null),
        };
    });
    return react_1.default.createElement(exports.AssetsList, { id: id, links: links });
};
exports.AssetsList = ({ id, links }) => {
    const { urlWithTenant } = ApiHubContext_1.useApiHub();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(List_1.default, null, links.length > 0 &&
            links.map(link => (react_1.default.createElement(ListItem_1.default, { key: link.id, disableGutters: true },
                react_1.default.createElement(Link_1.default, { type: link.type, href: `${urlWithTenant}${link.href}`, download: link.name }, link.name))))),
        links.length > 1 ? react_1.default.createElement(DownloadFilesButton, { id: id }) : null));
};
//# sourceMappingURL=ApiAssetsField.js.map