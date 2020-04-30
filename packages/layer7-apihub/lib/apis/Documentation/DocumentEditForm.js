"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_admin_1 = require("react-admin");
const core_1 = require("@material-ui/core");
const ui_1 = require("../../ui");
const DocumentFormToolbar_1 = require("./DocumentFormToolbar");
const useStyles = core_1.makeStyles(theme => ({
    title: {
        display: 'inline-block',
        width: '30%',
    },
    navtitle: {
        display: 'inline-block',
        marginLeft: theme.spacing(4),
        width: '30%',
    },
    modifyTs: {
        display: 'inline-block',
        marginLeft: theme.spacing(4),
        width: '30%',
    },
    markdown: {
        width: '100%',
    },
}));
const DocumentForm = ({ record = {}, loading = false, error = null, onSave = () => { }, onCancel = () => { }, }) => {
    const classes = useStyles();
    return (react_1.default.createElement(react_admin_1.SimpleForm, { resource: "documents", record: record, toolbar: react_1.default.createElement(DocumentFormToolbar_1.DocumentFormToolbar, { loading: loading, error: error, onCancel: onCancel }), save: onSave },
        react_1.default.createElement(react_admin_1.TextInput, { source: "title", formClassName: classes.title, validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.TextField, { source: "navtitle", formClassName: classes.navtitle }),
        react_1.default.createElement(react_admin_1.DateField, { source: "modifyTs", formClassName: classes.modifyTs }),
        react_1.default.createElement(ui_1.MarkdownInput, { source: "markdown", formClassName: classes.markdown, validate: react_admin_1.required(), isRequired: true, fullWidth: true })));
};
exports.DocumentEditForm = ({ document, onSave = () => { }, onCancel = () => { }, }) => {
    const notify = react_admin_1.useNotify();
    const [update, { data, loading, error }] = react_admin_1.useUpdate('documents');
    const handleSave = newDocument => {
        update({
            payload: {
                id: document.id,
                data: Object.assign(Object.assign({}, newDocument), { id: document.id }),
            },
        }, {
            action: react_admin_1.CRUD_UPDATE,
            onSuccess: () => {
                notify('resources.documents.notifications.edit_success');
            },
            onFailure: () => {
                notify('resources.documents.notifications.edit_error');
            },
        });
    };
    react_1.useEffect(() => {
        if (data && data.uuid) {
            onSave(data);
        }
    }, [data, onSave]);
    return (react_1.default.createElement(DocumentForm, { record: document, loading: loading, error: error, onSave: handleSave, onCancel: onCancel }));
};
//# sourceMappingURL=DocumentEditForm.js.map