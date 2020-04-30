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
import React, { useMemo, useEffect } from 'react';
import { CRUD_GET_LIST, useTranslate, useGetList, useVersion } from 'ra-core';
import { Labeled } from 'react-admin';
import { useDispatch, useSelector } from 'react-redux';
import { parse, stringify } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconAdd from '@material-ui/icons/Add';
import { useApiHubPreference, readApiHubPreference } from '../../preferences';
import { DocumentationTree, DocumentView, DocumentCreate, DocumentEdit, } from './';
import { documentHasChildren } from './DocumentationTree';
import { createNewDocument } from './DocumentCreate';
import { getAllDocumentParents } from './getAllDocumentParents';
import { defaultLocale, documentationLocales, LocaleSwitcherMenu, supportedLocales, } from '../../i18n';
import { addNewDocument, removeNewDocument, getNewDocument, addExpandedNodes, } from './documentationReducer';
import { useExpandedNodes } from './documentationTreeHooks';
const entityType = 'api';
const entityTypeUuid = 'f0ee916c-9cb9-4e96-9d0e-268f74a2c2d3';
function useQuery() {
    const location = useLocation();
    return parse(location.search);
}
function useDocumentationHistory(items, entityUuid, locale) {
    const history = useHistory();
    const query = useQuery();
    const dispatch = useDispatch();
    const selectedDocumentNavtitle = get(query, 'uri', null);
    const mode = get(query, 'mode', 'view');
    const selectedDocument = items.find(documentation => documentation.navtitle === selectedDocumentNavtitle);
    const selectedDocumentId = selectedDocument ? selectedDocument.id : null;
    useEffect(() => {
        const parents = getAllDocumentParents(selectedDocument, items).map(({ id }) => id);
        if (parents.length > 0) {
            dispatch(addExpandedNodes(entityUuid, locale, parents));
        }
    }, [dispatch, items, locale, selectedDocument, entityUuid]);
    const openDocumentPage = (document = null, mode = 'view', state = null) => {
        return history.push(Object.assign({ pathname: history.location.pathname, search: stringify(Object.assign(Object.assign({}, (document && { uri: document.navtitle })), { mode })) }, (state != null && { state })));
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
    const translate = useTranslate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [expanded, setExpanded] = useExpandedNodes(entityUuid, locale);
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
    const newDocument = useSelector(getNewDocument);
    useEffect(() => {
        if (mode === 'add') {
            if (!history.location.state) {
                history.goBack();
                return;
            }
            dispatch(addNewDocument(history.location.state));
        }
        else if (newDocument) {
            dispatch(removeNewDocument());
        }
    }, [dispatch, history, mode, newDocument]);
    const handleAddNewDocument = parentDocument => {
        if (newDocument != null) {
            return;
        }
        if (parentDocument) {
            dispatch(addExpandedNodes(entityUuid, locale, [parentDocument.id]));
        }
        const title = translate('resources.apis.documentation.fields.new_document');
        openNewDocumentPage(createNewDocument(title, parentDocument, items, entityType, entityTypeUuid, locale));
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
    const hasChildren = useMemo(() => selectedDocument
        ? documentHasChildren(items, selectedDocument)
        : false, [items, selectedDocument]);
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { className: classes.tree },
            React.createElement("div", { className: classes.treeToolbar },
                React.createElement(Labeled, { label: "resources.apis.documentation.fields.select_documentation_locale" },
                    React.createElement(LocaleSwitcherMenu, { locale: locale, locales: supportedLocales, onChange: handleLocaleChange, className: classes.localeButton })),
                userCanEdit && (React.createElement(IconButton, { color: "primary", onClick: () => handleAddNewDocument(), disabled: newDocument != null, "aria-label": translate('resources.apis.documentation.actions.new_document_button'), title: translate('resources.apis.documentation.actions.new_document_button') },
                    React.createElement(IconAdd, null)))),
            React.createElement(Divider, null),
            locale && (React.createElement(DocumentationTree, { items: [
                    ...(newDocument != null ? [newDocument] : []),
                    ...items,
                ], onDocumentSelected: handleSelectDocument, selectedDocumentId: newDocument != null
                    ? newDocument.id
                    : selectedDocumentId, expanded: expanded, onExpandedChange: setExpanded }))),
        React.createElement("div", { className: classes.documentation },
            selectedDocument && mode === 'view' ? (React.createElement(DocumentView, { document: selectedDocument, entityType: entityType, entityUuid: entityUuid, locale: locale, userCanDelete: userCanDelete, userCanEdit: userCanEdit, hasChildren: hasChildren, onEdit: handleEditDocument, onAddNewDocument: handleAddNewDocument, onDeleteDocument: handleDeleteDocument, allDocuments: items })) : null,
            selectedDocument && mode === 'edit' ? (React.createElement(DocumentEdit, { document: selectedDocument, entityType: entityType, entityUuid: entityUuid, userCanDelete: userCanDelete, userCanEdit: userCanEdit, hasChildren: hasChildren, onSave: handleSaveEditDocument, onCancel: handleCancelEditDocument, onAddNewDocument: handleAddNewDocument, onDeleteDocument: handleDeleteDocument })) : null,
            newDocument && mode === 'add' ? (React.createElement(DocumentCreate, { document: newDocument, entityType: entityType, entityUuid: entityUuid, allDocuments: items, onSaved: handleSaveNewDocument, onCancel: handleCancelAddNewDocument })) : null)));
};
export const Documentation = (_a) => {
    var { record } = _a, rest = __rest(_a, ["record"]);
    const translate = useTranslate();
    const version = useVersion();
    const [documentationLocalePreference, writeDocumentationLocalePreference,] = useApiHubPreference('documentationLocale');
    useEffect(() => {
        const locale = readApiHubPreference('locale', defaultLocale);
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
    const { ids, loaded, error, total } = useGetList('documents', undefined, undefined, {
        entityType,
        entityUuid: record.id,
        locale: documentationLocales[documentationLocalePreference],
    }, {
        action: CRUD_GET_LIST,
        version,
    });
    // When the user changes the page/sort/filter or delete an item, this
    // controller runs the useGetList hook again. While the result of this new
    // call is loading, the ids and total are empty. To avoid rendering an
    // empty list at that moment, we override the ids and total with the latest
    // loaded ones.
    const defaultIds = useSelector(state => get(state.admin.resources, ['documents', 'list', 'ids'], []));
    const idsToDisplay = typeof total === 'undefined' ? defaultIds : ids;
    const data = useSelector(state => get(state.admin.resources, ['documents', 'data'], {}));
    const items = useMemo(() => Object.values(data).filter(item => idsToDisplay.includes(item.id)), [data, idsToDisplay]);
    if (!loaded) {
        return React.createElement(LinearProgress, null);
    }
    if (!data || error) {
        return (React.createElement(Typography, { variant: "body2", color: "error" }, translate('ra.page.error')));
    }
    return (React.createElement(DocumentationContent, Object.assign({ entityUuid: record.id, items: items, locale: documentationLocalePreference, onLocaleChange: handleDocumentationLocaleChange }, rest)));
};
const useStyles = makeStyles(theme => ({
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