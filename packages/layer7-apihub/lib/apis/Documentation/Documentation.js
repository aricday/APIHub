"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
const react_admin_1 = require("react-admin");
const react_redux_1 = require("react-redux");
const query_string_1 = require("query-string");
const react_router_dom_1 = require("react-router-dom");
const get_1 = __importDefault(require("lodash/get"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const preferences_1 = require("../../preferences");
const _1 = require("./");
const DocumentationTree_1 = require("./DocumentationTree");
const DocumentCreate_1 = require("./DocumentCreate");
const getAllDocumentParents_1 = require("./getAllDocumentParents");
const i18n_1 = require("../../i18n");
const documentationReducer_1 = require("./documentationReducer");
const documentationTreeHooks_1 = require("./documentationTreeHooks");
const entityType = 'api';
const entityTypeUuid = 'f0ee916c-9cb9-4e96-9d0e-268f74a2c2d3';
function useQuery() {
    const location = react_router_dom_1.useLocation();
    return query_string_1.parse(location.search);
}
function useDocumentationHistory(items, entityUuid, locale) {
    const history = react_router_dom_1.useHistory();
    const query = useQuery();
    const dispatch = react_redux_1.useDispatch();
    const selectedDocumentNavtitle = get_1.default(query, 'uri', null);
    const mode = get_1.default(query, 'mode', 'view');
    const selectedDocument = items.find(documentation => documentation.navtitle === selectedDocumentNavtitle);
    const selectedDocumentId = selectedDocument ? selectedDocument.id : null;
    react_1.useEffect(() => {
        const parents = getAllDocumentParents_1.getAllDocumentParents(selectedDocument, items).map(({ id }) => id);
        if (parents.length > 0) {
            dispatch(documentationReducer_1.addExpandedNodes(entityUuid, locale, parents));
        }
    }, [dispatch, items, locale, selectedDocument, entityUuid]);
    const openDocumentPage = (document = null, mode = 'view', state = null) => {
        return history.push(Object.assign({ pathname: history.location.pathname, search: query_string_1.stringify(Object.assign(Object.assign({}, (document && { uri: document.navtitle })), { mode })) }, (state != null && { state })));
    };
    const openNewDocumentPage = state => {
        return openDocumentPage(null, 'add', state);
    };
    const closeDocumentPage = () => {
        return history.push({
            pathname: history.location.pathname,
        });
    };
    return {
        mode,
        selectedDocument,
        selectedDocumentId,
        openDocumentPage,
        openNewDocumentPage,
        closeDocumentPage,
    };
}
const DocumentationContent = ({ entityUuid, items, locale, onLocaleChange, userCanEdit = false, userCanDelete = false, }) => {
    const translate = ra_core_1.useTranslate();
    const classes = useStyles();
    const dispatch = react_redux_1.useDispatch();
    const history = react_router_dom_1.useHistory();
    const [expanded, setExpanded] = documentationTreeHooks_1.useExpandedNodes(entityUuid, locale);
    const { mode, selectedDocument, selectedDocumentId, openDocumentPage, openNewDocumentPage, closeDocumentPage, } = useDocumentationHistory(items, entityUuid, locale);
    const handleLocaleChange = locale => {
        openDocumentPage();
        onLocaleChange(locale);
    };
    const handleSelectDocument = document => {
        openDocumentPage(document, 'view');
    };
    const handleEditDocument = () => {
        openDocumentPage(selectedDocument, 'edit');
    };
    const handleSaveEditDocument = () => {
        openDocumentPage(selectedDocument, 'view');
    };
    const handleCancelEditDocument = () => {
        openDocumentPage(selectedDocument, 'view');
    };
    const newDocument = react_redux_1.useSelector(documentationReducer_1.getNewDocument);
    react_1.useEffect(() => {
        if (mode === 'add') {
            if (!history.location.state) {
                history.goBack();
                return;
            }
            dispatch(documentationReducer_1.addNewDocument(history.location.state));
        }
        else if (newDocument) {
            dispatch(documentationReducer_1.removeNewDocument());
        }
    }, [dispatch, history, mode, newDocument]);
    const handleAddNewDocument = parentDocument => {
        if (newDocument != null) {
            return;
        }
        if (parentDocument) {
            dispatch(documentationReducer_1.addExpandedNodes(entityUuid, locale, [parentDocument.id]));
        }
        const title = translate('resources.apis.documentation.fields.new_document');
        openNewDocumentPage(DocumentCreate_1.createNewDocument(title, parentDocument, items, entityType, entityTypeUuid, locale));
    };
    const handleSaveNewDocument = document => {
        openDocumentPage(document, 'view');
    };
    const handleCancelAddNewDocument = () => {
        closeDocumentPage();
    };
    const handleDeleteDocument = () => {
        closeDocumentPage();
    };
    const hasChildren = react_1.useMemo(() => selectedDocument
        ? DocumentationTree_1.documentHasChildren(items, selectedDocument)
        : false, [items, selectedDocument]);
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement("div", { className: classes.tree },
            react_1.default.createElement("div", { className: classes.treeToolbar },
                react_1.default.createElement(react_admin_1.Labeled, { label: "resources.apis.documentation.fields.select_documentation_locale" },
                    react_1.default.createElement(i18n_1.LocaleSwitcherMenu, { locale: locale, locales: i18n_1.supportedLocales, onChange: handleLocaleChange, className: classes.localeButton })),
                userCanEdit && (react_1.default.createElement(IconButton_1.default, { color: "primary", onClick: () => handleAddNewDocument(), disabled: newDocument != null, "aria-label": translate('resources.apis.documentation.actions.new_document_button'), title: translate('resources.apis.documentation.actions.new_document_button') },
                    react_1.default.createElement(Add_1.default, null)))),
            react_1.default.createElement(Divider_1.default, null),
            locale && (react_1.default.createElement(_1.DocumentationTree, { items: [
                    ...(newDocument != null ? [newDocument] : []),
                    ...items,
                ], onDocumentSelected: handleSelectDocument, selectedDocumentId: newDocument != null
                    ? newDocument.id
                    : selectedDocumentId, expanded: expanded, onExpandedChange: setExpanded }))),
        react_1.default.createElement("div", { className: classes.documentation },
            selectedDocument && mode === 'view' ? (react_1.default.createElement(_1.DocumentView, { document: selectedDocument, entityType: entityType, entityUuid: entityUuid, locale: locale, userCanDelete: userCanDelete, userCanEdit: userCanEdit, hasChildren: hasChildren, onEdit: handleEditDocument, onAddNewDocument: handleAddNewDocument, onDeleteDocument: handleDeleteDocument, allDocuments: items })) : null,
            selectedDocument && mode === 'edit' ? (react_1.default.createElement(_1.DocumentEdit, { document: selectedDocument, entityType: entityType, entityUuid: entityUuid, userCanDelete: userCanDelete, userCanEdit: userCanEdit, hasChildren: hasChildren, onSave: handleSaveEditDocument, onCancel: handleCancelEditDocument, onAddNewDocument: handleAddNewDocument, onDeleteDocument: handleDeleteDocument })) : null,
            newDocument && mode === 'add' ? (react_1.default.createElement(_1.DocumentCreate, { document: newDocument, entityType: entityType, entityUuid: entityUuid, allDocuments: items, onSaved: handleSaveNewDocument, onCancel: handleCancelAddNewDocument })) : null)));
};
exports.Documentation = (_a) => {
    var { record } = _a, rest = __rest(_a, ["record"]);
    const translate = ra_core_1.useTranslate();
    const version = ra_core_1.useVersion();
    const [documentationLocalePreference, writeDocumentationLocalePreference,] = preferences_1.useApiHubPreference('documentationLocale');
    react_1.useEffect(() => {
        const locale = preferences_1.readApiHubPreference('locale', i18n_1.defaultLocale);
        if (documentationLocalePreference === undefined) {
            writeDocumentationLocalePreference(locale);
        }
    }, [documentationLocalePreference, writeDocumentationLocalePreference]);
    const handleDocumentationLocaleChange = newLocale => {
        writeDocumentationLocalePreference(newLocale);
    };
    /**
     * We want the list of ids to be always available for optimistic rendering,
     * and therefore we need a custom action (CRUD_GET_LIST) that will be used.
     */
    const { ids, loaded, error, total } = ra_core_1.useGetList('documents', undefined, undefined, {
        entityType,
        entityUuid: record.id,
        locale: i18n_1.documentationLocales[documentationLocalePreference],
    }, {
        action: ra_core_1.CRUD_GET_LIST,
        version,
    });
    // When the user changes the page/sort/filter or delete an item, this
    // controller runs the useGetList hook again. While the result of this new
    // call is loading, the ids and total are empty. To avoid rendering an
    // empty list at that moment, we override the ids and total with the latest
    // loaded ones.
    const defaultIds = react_redux_1.useSelector(state => get_1.default(state.admin.resources, ['documents', 'list', 'ids'], []));
    const idsToDisplay = typeof total === 'undefined' ? defaultIds : ids;
    const data = react_redux_1.useSelector(state => get_1.default(state.admin.resources, ['documents', 'data'], {}));
    const items = react_1.useMemo(() => Object.values(data).filter(item => idsToDisplay.includes(item.id)), [data, idsToDisplay]);
    if (!loaded) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (!data || error) {
        return (react_1.default.createElement(Typography_1.default, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    return (react_1.default.createElement(DocumentationContent, Object.assign({ entityUuid: record.id, items: items, locale: documentationLocalePreference, onLocaleChange: handleDocumentationLocaleChange }, rest)));
};
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    tree: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        paddingRight: theme.spacing(2),
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: '20%',
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        borderWidth: '0px 1px 0px 0px',
    },
    treeToolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    documentation: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
        padding: theme.spacing(1),
        flexGrow: 1,
    },
    localeButton: {
        width: '100%',
        justifyContent: 'space-between',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}), { name: 'Layer7Documentation' });
//# sourceMappingURL=Documentation.js.map