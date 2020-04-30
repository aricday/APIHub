"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const react_admin_1 = require("react-admin");
const ra_core_1 = require("ra-core");
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const ui_1 = require("../ui");
const VisibilityField_1 = require("./VisibilityField");
const ApiAssetsField_1 = require("./ApiAssetsField");
const Application_1 = require("./Application");
const TagsField_1 = require("./TagsField");
const useOverviewStyles = styles_1.makeStyles(theme => ({
    root: {
        display: 'flex',
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        margin: -theme.spacing(1),
    },
    enabledContainer: {
        width: 'auto',
    },
    enabled: {
        color: theme.palette.success.main,
        '& $enabledIcon': {
            backgroundColor: theme.palette.success.main,
        },
    },
    disabled: {
        '& $enabledIcon': {
            backgroundColor: theme.palette.text.disabled,
        },
    },
    enabledIcon: {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        borderRadius: 99999,
        marginRight: theme.spacing(),
    },
    field: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: '100px',
    },
    type: {
        textTransform: 'uppercase',
    },
}));
const useHeaderStyles = styles_1.makeStyles(theme => ({
    label: {
        textTransform: 'uppercase',
    },
    value: {
        fontWeight: theme.typography.fontWeightBold,
    },
}));
const useContentStyles = styles_1.makeStyles(theme => ({
    label: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1.5rem',
    },
}));
const useGridStyles = styles_1.makeStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));
const useRightGridStyles = styles_1.makeStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
}));
exports.Overview = ({ record, userIsPublisher }) => {
    const classes = useOverviewStyles();
    const gridClasses = useGridStyles();
    const rightGridClasses = useRightGridStyles();
    const headerLabelClasses = useHeaderStyles();
    const contentLabelClasses = useContentStyles();
    const translate = ra_core_1.useTranslate();
    return (react_1.default.createElement(Grid_1.default, { className: classes.root, container: true, spacing: 3 },
        react_1.default.createElement(Grid_1.default, { container: true, item: true, md: 8, sm: 12, direction: "row", classes: gridClasses },
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.portalStatus", classes: headerLabelClasses, className: classes.field },
                    react_1.default.createElement(Grid_1.default, { item: true, container: true, alignItems: "center", className: classnames_1.default(classes.enabledContainer, {
                            [classes.enabled]: record.portalStatus === 'ENABLED',
                            [classes.disabled]: record.portalStatus !== 'ENABLED',
                        }) },
                        react_1.default.createElement("div", { className: classes.enabledIcon }),
                        react_1.default.createElement(Typography_1.default, { variant: "body2", className: headerLabelClasses.value }, translate(`resources.apis.portalStatus.${record.portalStatus.toLowerCase()}`))))),
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.apiServiceType", classes: headerLabelClasses, className: classes.field },
                    react_1.default.createElement(react_admin_1.TextField, { record: record, source: "apiServiceType", className: classnames_1.default(headerLabelClasses.value, classes.type) }))),
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.version", classes: headerLabelClasses, className: classes.field },
                    react_1.default.createElement(Typography_1.default, { variant: "body2", className: headerLabelClasses.value }, translate('resources.apis.overview.fields.version', {
                        version: record.version,
                    })))),
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.accessStatus", classes: headerLabelClasses, className: classes.field },
                    react_1.default.createElement(VisibilityField_1.VisibilityField, { record: record, source: "accessStatus", className: headerLabelClasses.value }))),
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.modifyTs", classes: headerLabelClasses, className: classes.field },
                    react_1.default.createElement(react_admin_1.DateField, { record: record, source: "modifyTs", className: headerLabelClasses.value })))),
        react_1.default.createElement(Grid_1.default, { container: true, item: true, md: 4, sm: 12, classes: rightGridClasses },
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.applicationUsage", classes: headerLabelClasses, className: classes.field },
                    react_1.default.createElement(Application_1.ApplicationUsageField, { id: record.id, className: headerLabelClasses.value })))),
        react_1.default.createElement(Grid_1.default, { container: true, item: true, md: 8, sm: 12, direction: "column", classes: gridClasses },
            userIsPublisher ? (react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.apiLocation", classes: contentLabelClasses, className: classes.field },
                    react_1.default.createElement(ui_1.LinkField, { record: record, source: "locationUrl", target: "_blank", rel: "noopener" })))) : null,
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.description", classes: contentLabelClasses, className: classes.field },
                    react_1.default.createElement(ui_1.MarkdownField, { record: record, source: "description" }))),
            userIsPublisher ? (react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.privateDescription", classes: contentLabelClasses, className: classes.field },
                    react_1.default.createElement(ui_1.MarkdownField, { record: record, source: "privateDescription" })))) : null,
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.tags", classes: contentLabelClasses, className: classes.field },
                    react_1.default.createElement(Grid_1.default, { item: true, container: true, alignItems: "center" },
                        react_1.default.createElement(TagsField_1.AsyncTagsField, { id: record.id }))))),
        react_1.default.createElement(Grid_1.default, { container: true, item: true, md: 4, sm: 12, classes: rightGridClasses },
            react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.fields.assets", classes: contentLabelClasses, className: classes.field },
                react_1.default.createElement(ApiAssetsField_1.ApiAssetsField, { id: record.id })))));
};
//# sourceMappingURL=Overview.js.map