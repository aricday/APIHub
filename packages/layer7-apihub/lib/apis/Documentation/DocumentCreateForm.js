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
const react_admin_1 = require("react-admin");
const core_1 = require("@material-ui/core");
const react_final_form_1 = require("react-final-form");
const slugify_1 = __importDefault(require("slugify"));
const documents_1 = require("../../dataProvider/documents");
const ui_1 = require("../../ui");
const DocumentFormToolbar_1 = require("./DocumentFormToolbar");
const URI_ALLOWED_STRING = /^[a-zA-Z0-9_-]*$/;
const URI_NOT_ALLOWED_CHARACTERS = /[^a-zA-Z0-9_-\s]/g;
exports.checkSpecialCharacters = () => value => {
    if (URI_ALLOWED_STRING.test(value)) {
        return;
    }
    return 'resources.apis.documentation.validation.error_no_special_characters';
};
exports.checkUnicity = navtitles => value => {
    if (!navtitles
        .map(navtitle => navtitle.toLowerCase())
        .includes(value.toLowerCase())) {
        return;
    }
    return 'resources.apis.documentation.validation.error_navtitle_not_unique';
};
const replaceNotAllowedCharacters = (text, replacement = '_') => {
    return text.replace(URI_NOT_ALLOWED_CHARACTERS, replacement);
};
exports.slugifyURI = uri => {
    const cleanedURI = replaceNotAllowedCharacters(uri, '_');
    return slugify_1.default(cleanedURI);
};
const useStyles = core_1.makeStyles(theme => ({
    title: {
        display: 'inline-block',
        width: '256px',
    },
    navtitle: {
        display: 'inline-block',
        marginLeft: theme.spacing(4),
        width: '256px',
    },
    markdown: {
        width: '100%',
    },
}));
exports.DocumentForm = ({ document = {}, loading = false, error = null, allDocuments = [], onSave = () => { }, onCancel = () => { }, }) => {
    const classes = useStyles();
    const navtitles = react_1.useMemo(() => Object.values(allDocuments).map(item => item.navtitle), [allDocuments]);
    return (react_1.default.createElement(react_admin_1.SimpleForm, { resource: "documents", record: document, toolbar: react_1.default.createElement(DocumentFormToolbar_1.DocumentFormToolbar, { loading: loading, error: error, onCancel: onCancel }), save: onSave },
        react_1.default.createElement(react_admin_1.FormDataConsumer, null, () => {
            // eslint-disable-next-line
            const form = react_final_form_1.useForm();
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_admin_1.TextInput, { resource: "documents", source: "title", className: classes.title, onChange: event => {
                        const navtitleFieldState = form.getFieldState('navtitle');
                        if (navtitleFieldState.modified &&
                            navtitleFieldState.touched) {
                            return;
                        }
                        const newNavtitle = exports.slugifyURI(event.target.value);
                        form.change('navtitle', newNavtitle);
                    }, validate: react_admin_1.required() }),
                react_1.default.createElement(react_admin_1.TextInput, { resource: "documents", source: "navtitle", className: classes.navtitle, validate: [
                        react_admin_1.required(),
                        exports.checkUnicity(navtitles),
                        exports.checkSpecialCharacters(),
                    ] })));
        }),
        react_1.default.createElement(ui_1.MarkdownInput, { source: "markdown", formClassName: classes.markdown, validate: react_admin_1.required(), isRequired: true, fullWidth: true })));
};
exports.DocumentCreateForm = ({ document, entityType, entityUuid, allDocuments = [], onSaved = () => { }, onCancel = () => { }, }) => {
    const notify = react_admin_1.useNotify();
    const refresh = react_admin_1.useRefresh();
    const [create, { loading, error }] = react_admin_1.useCreate('documents');
    const handleSave = newDocument => {
        const documentId = documents_1.buildDocumentId(entityType, entityUuid, newDocument.navtitle, newDocument.locale);
        create({
            payload: { data: Object.assign(Object.assign({}, newDocument), { id: documentId }) },
        }, {
            action: react_admin_1.CRUD_CREATE,
            onSuccess: ({ data }) => {
                notify('resources.documents.notifications.create_success');
                refresh();
                onSaved(data);
            },
            onFailure: () => {
                notify('resources.documents.notifications.create_error');
            },
        });
    };
    return (react_1.default.createElement(exports.DocumentForm, { document: document, loading: loading, error: error, allDocuments: allDocuments, onSave: handleSave, onCancel: onCancel }));
};
//# sourceMappingURL=DocumentCreateForm.js.map