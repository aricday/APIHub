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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const styles_1 = require("@material-ui/core/styles");
const AccountTree_1 = __importDefault(require("@material-ui/icons/AccountTree"));
const ra_core_1 = require("ra-core");
const flow_1 = __importDefault(require("lodash/flow"));
const react_redux_1 = require("react-redux");
const DocumentationTree_1 = require("./DocumentationTree");
const getAllDocumentParents_1 = require("./getAllDocumentParents");
const useStyles = styles_1.makeStyles({
    fullWidth: {
        width: '100%',
    },
});
exports.FakeRootUuid = '@layer7-fake-root';
exports.moveDocument = ({ document, newParentId, ordinal, allDocuments, }) => {
    const newDocuments = Array.from(allDocuments);
    const updatedDocument = newDocuments.find(doc => doc.id === document.id);
    if (!updatedDocument || !newParentId) {
        return;
    }
    const newParent = newDocuments.find(doc => doc.id === newParentId);
    if (!newParent) {
        return;
    }
    const newSiblingsWhichMustBeMoved = newDocuments.filter(doc => doc.parentUuid === newParent.uuid && doc.ordinal >= ordinal);
    newSiblingsWhichMustBeMoved.forEach((doc, index) => {
        doc.ordinal += 1;
    });
    const oldSiblingsWhichMustBeMoved = newDocuments.filter(doc => doc.parentUuid === updatedDocument.parentUuid &&
        doc.ordinal > updatedDocument.ordinal);
    oldSiblingsWhichMustBeMoved.forEach((doc, index) => {
        doc.ordinal -= 1;
    });
    newDocuments.filter(item => item.parentUuid === exports.FakeRootUuid);
    updatedDocument.parentUuid = newParent.uuid;
    updatedDocument.ordinal = ordinal;
    return newDocuments;
};
const cleanupFakeRootUuid = items => items
    .filter(item => item.id !== exports.FakeRootUuid)
    .reduce((acc, item) => {
    if (item.parentUuid === exports.FakeRootUuid) {
        acc.push(Object.assign(Object.assign({}, item), { parentUuid: undefined }));
        return acc;
    }
    acc.push(item);
    return acc;
}, []);
const prepareDataForUpdate = items => items.map((_a) => {
    var { id, children, markdown } = _a, item = __rest(_a, ["id", "children", "markdown"]);
    return item;
});
exports.ChangeParentDocumentButton = (_a) => {
    var { allDocuments = [], document, entityType, entityUuid, locale } = _a, props = __rest(_a, ["allDocuments", "document", "entityType", "entityUuid", "locale"]);
    const [open, setOpen] = react_1.useState(false);
    const [newSibling, setNewSiblings] = react_1.useState([]);
    const [newParentId, setNewParentId] = react_1.useState(null);
    const [ordinal, setOrdinal] = react_1.useState(0);
    const classes = useStyles();
    const translate = ra_core_1.useTranslate();
    const dispatch = react_redux_1.useDispatch();
    const notify = ra_core_1.useNotify();
    // Here we introduce a fake root item so that users have something
    // to select in order to move a document to the root
    const treeItems = react_1.useMemo(() => [
        {
            id: exports.FakeRootUuid,
            uuid: exports.FakeRootUuid,
            title: translate('resources.documents.actions.move_as_root_item'),
        },
        ...allDocuments.map(doc => !!doc.parentUuid
            ? doc
            : Object.assign(Object.assign({}, doc), { parentUuid: exports.FakeRootUuid })),
    ], [allDocuments, translate]);
    const currentDocumentParents = getAllDocumentParents_1.getAllDocumentParents(document, allDocuments);
    const [expanded, setExpanded] = react_1.useState([
        exports.FakeRootUuid,
        ...currentDocumentParents.map(parent => parent.id),
    ]);
    const [mutate, { loading }] = ra_core_1.useMutation({
        type: 'updateTree',
        resource: 'documents',
    });
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        const newDocuments = flow_1.default([exports.moveDocument, cleanupFakeRootUuid])({
            document,
            newParentId,
            ordinal,
            allDocuments: treeItems,
        });
        mutate({
            payload: {
                entityType,
                entityUuid,
                locale,
                data: prepareDataForUpdate(newDocuments),
            },
        }, {
            undoable: true,
            onSuccess: () => {
                setOpen(false);
                // Fake a getList fetch success to optimistically update
                // the treeview, avoiding a full view refresh
                dispatch({
                    type: ra_core_1.CRUD_GET_LIST_SUCCESS,
                    payload: {
                        data: newDocuments,
                        total: newDocuments.length,
                    },
                    meta: {
                        resource: 'documents',
                        fetchResponse: ra_core_1.GET_LIST,
                        fetchStatus: ra_core_1.FETCH_END,
                    },
                });
                notify('resources.documents.notifications.tree_updated_success', 'info', undefined, true);
            },
            onFailure: () => {
                notify('resources.documents.notifications.tree_updated_error', 'warning');
                // Fake a getList fetch success to optimistically update
                // the treeview, avoiding a full view refresh
                // Here we pass the original documents
                dispatch({
                    type: ra_core_1.CRUD_GET_LIST_SUCCESS,
                    payload: {
                        data: allDocuments,
                        total: allDocuments.length,
                    },
                    meta: {
                        resource: 'documents',
                        fetchResponse: ra_core_1.GET_LIST,
                        fetchStatus: ra_core_1.FETCH_END,
                    },
                });
            },
        });
    };
    const handleNewParentSelected = node => {
        setNewParentId(node.id);
        const newParent = treeItems.find(doc => doc.id === node.id);
        if (!newParent) {
            setOrdinal(0);
            setNewSiblings([]);
            return;
        }
        const siblings = DocumentationTree_1.getChildDocuments(newParent, treeItems, DocumentationTree_1.sortByOrdinal);
        if (siblings.length === 0) {
            setOrdinal(0);
            setNewSiblings([]);
            return;
        }
        setNewSiblings(siblings);
    };
    const handleOrdinalChange = event => setOrdinal(event.target.value);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.default, Object.assign({ onClick: handleClick, "aria-label": translate('resources.documents.actions.change_document_parent_button'), startIcon: react_1.default.createElement(AccountTree_1.default, null) }, props), translate('resources.documents.actions.change_document_parent_button')),
        react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
            react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, translate('resources.documents.actions.change_document_parent_button')),
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement(DocumentationTree_1.DocumentationTree, { items: treeItems.filter(item => item.id !== document.id), selectedDocumentId: newParentId, onDocumentSelected: handleNewParentSelected, expanded: expanded, onExpandedChange: setExpanded }),
                react_1.default.createElement("hr", null),
                newSibling.length > 0 ? (react_1.default.createElement(FormControl_1.default, { className: classes.fullWidth },
                    react_1.default.createElement(InputLabel_1.default, { id: "ordinal-select-label" }, translate('resources.documents.fields.ordinal')),
                    react_1.default.createElement(Select_1.default, { labelId: "ordinal-select-label", key: newParentId, onChange: handleOrdinalChange, value: ordinal, className: classes.fullWidth },
                        react_1.default.createElement(MenuItem_1.default, { value: 0 }, translate('resources.documents.actions.move_as_first_child')),
                        newSibling.map(child => (react_1.default.createElement(MenuItem_1.default, { key: child.id, value: child.ordinal + 1 }, translate('resources.documents.actions.move_after_document', { title: child.title }))))))) : null),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { onClick: handleClose, disabled: loading || !newParentId, color: "primary" }, translate('ra.action.cancel')),
                react_1.default.createElement(Button_1.default, { onClick: handleSave, disabled: loading, color: "primary" }, translate('ra.action.save'))))));
};
//# sourceMappingURL=ChangeParentDocumentButton.js.map