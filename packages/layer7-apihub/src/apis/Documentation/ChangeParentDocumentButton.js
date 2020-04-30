import React, { useState, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconAccountTree from '@material-ui/icons/AccountTree';
import {
    useMutation,
    useNotify,
    useTranslate,
    CRUD_GET_LIST_SUCCESS,
    GET_LIST,
    FETCH_END,
} from 'ra-core';
import flow from 'lodash/flow';
import { useDispatch } from 'react-redux';

import {
    DocumentationTree,
    getChildDocuments,
    sortByOrdinal,
} from './DocumentationTree';
import { getAllDocumentParents } from './getAllDocumentParents';

const useStyles = makeStyles({
    fullWidth: {
        width: '100%',
    },
});

export const FakeRootUuid = '@layer7-fake-root';

export const moveDocument = ({
    document,
    newParentId,
    ordinal,
    allDocuments,
}) => {
    const newDocuments = Array.from(allDocuments);

    const updatedDocument = newDocuments.find(doc => doc.id === document.id);

    if (!updatedDocument || !newParentId) {
        return;
    }

    const newParent = newDocuments.find(doc => doc.id === newParentId);

    if (!newParent) {
        return;
    }

    const newSiblingsWhichMustBeMoved = newDocuments.filter(
        doc => doc.parentUuid === newParent.uuid && doc.ordinal >= ordinal
    );

    newSiblingsWhichMustBeMoved.forEach((doc, index) => {
        doc.ordinal += 1;
    });

    const oldSiblingsWhichMustBeMoved = newDocuments.filter(
        doc =>
            doc.parentUuid === updatedDocument.parentUuid &&
            doc.ordinal > updatedDocument.ordinal
    );

    oldSiblingsWhichMustBeMoved.forEach((doc, index) => {
        doc.ordinal -= 1;
    });

    newDocuments.filter(item => item.parentUuid === FakeRootUuid);

    updatedDocument.parentUuid = newParent.uuid;
    updatedDocument.ordinal = ordinal;

    return newDocuments;
};

const cleanupFakeRootUuid = items =>
    items
        .filter(item => item.id !== FakeRootUuid)
        .reduce((acc, item) => {
            if (item.parentUuid === FakeRootUuid) {
                acc.push({
                    ...item,
                    parentUuid: undefined,
                });
                return acc;
            }
            acc.push(item);
            return acc;
        }, []);

const prepareDataForUpdate = items =>
    items.map(({ id, children, markdown, ...item }) => item);

export const ChangeParentDocumentButton = ({
    allDocuments = [],
    document,
    entityType,
    entityUuid,
    locale,
    ...props
}) => {
    const [open, setOpen] = useState(false);
    const [newSibling, setNewSiblings] = useState([]);
    const [newParentId, setNewParentId] = useState(null);
    const [ordinal, setOrdinal] = useState(0);
    const classes = useStyles();

    const translate = useTranslate();
    const dispatch = useDispatch();
    const notify = useNotify();

    // Here we introduce a fake root item so that users have something
    // to select in order to move a document to the root
    const treeItems = useMemo(
        () => [
            {
                id: FakeRootUuid,
                uuid: FakeRootUuid,
                title: translate(
                    'resources.documents.actions.move_as_root_item'
                ),
            },
            ...allDocuments.map(doc =>
                !!doc.parentUuid
                    ? doc
                    : {
                          ...doc,
                          parentUuid: FakeRootUuid,
                      }
            ),
        ],
        [allDocuments, translate]
    );

    const currentDocumentParents = getAllDocumentParents(
        document,
        allDocuments
    );

    const [expanded, setExpanded] = useState([
        FakeRootUuid,
        ...currentDocumentParents.map(parent => parent.id),
    ]);

    const [mutate, { loading }] = useMutation({
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
        const newDocuments = flow([moveDocument, cleanupFakeRootUuid])({
            document,
            newParentId,
            ordinal,
            allDocuments: treeItems,
        });

        mutate(
            {
                payload: {
                    entityType,
                    entityUuid,
                    locale,
                    data: prepareDataForUpdate(newDocuments),
                },
            },
            {
                undoable: true,
                onSuccess: () => {
                    setOpen(false);

                    // Fake a getList fetch success to optimistically update
                    // the treeview, avoiding a full view refresh
                    dispatch({
                        type: CRUD_GET_LIST_SUCCESS,
                        payload: {
                            data: newDocuments,
                            total: newDocuments.length,
                        },
                        meta: {
                            resource: 'documents',
                            fetchResponse: GET_LIST,
                            fetchStatus: FETCH_END,
                        },
                    });
                    notify(
                        'resources.documents.notifications.tree_updated_success',
                        'info',
                        undefined,
                        true
                    );
                },
                onFailure: () => {
                    notify(
                        'resources.documents.notifications.tree_updated_error',
                        'warning'
                    );
                    // Fake a getList fetch success to optimistically update
                    // the treeview, avoiding a full view refresh
                    // Here we pass the original documents
                    dispatch({
                        type: CRUD_GET_LIST_SUCCESS,
                        payload: {
                            data: allDocuments,
                            total: allDocuments.length,
                        },
                        meta: {
                            resource: 'documents',
                            fetchResponse: GET_LIST,
                            fetchStatus: FETCH_END,
                        },
                    });
                },
            }
        );
    };

    const handleNewParentSelected = node => {
        setNewParentId(node.id);

        const newParent = treeItems.find(doc => doc.id === node.id);
        if (!newParent) {
            setOrdinal(0);
            setNewSiblings([]);
            return;
        }
        const siblings = getChildDocuments(newParent, treeItems, sortByOrdinal);

        if (siblings.length === 0) {
            setOrdinal(0);
            setNewSiblings([]);
            return;
        }

        setNewSiblings(siblings);
    };

    const handleOrdinalChange = event => setOrdinal(event.target.value);

    return (
        <>
            <Button
                onClick={handleClick}
                aria-label={translate(
                    'resources.documents.actions.change_document_parent_button'
                )}
                startIcon={<IconAccountTree />}
                {...props}
            >
                {translate(
                    'resources.documents.actions.change_document_parent_button'
                )}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {translate(
                        'resources.documents.actions.change_document_parent_button'
                    )}
                </DialogTitle>
                <DialogContent>
                    <DocumentationTree
                        items={treeItems.filter(
                            item => item.id !== document.id
                        )}
                        selectedDocumentId={newParentId}
                        onDocumentSelected={handleNewParentSelected}
                        expanded={expanded}
                        onExpandedChange={setExpanded}
                    />
                    <hr />
                    {newSibling.length > 0 ? (
                        <FormControl className={classes.fullWidth}>
                            <InputLabel id="ordinal-select-label">
                                {translate(
                                    'resources.documents.fields.ordinal'
                                )}
                            </InputLabel>
                            <Select
                                labelId="ordinal-select-label"
                                key={newParentId}
                                onChange={handleOrdinalChange}
                                value={ordinal}
                                className={classes.fullWidth}
                            >
                                <MenuItem value={0}>
                                    {translate(
                                        'resources.documents.actions.move_as_first_child'
                                    )}
                                </MenuItem>
                                {newSibling.map(child => (
                                    <MenuItem
                                        key={child.id}
                                        value={child.ordinal + 1}
                                    >
                                        {translate(
                                            'resources.documents.actions.move_after_document',
                                            { title: child.title }
                                        )}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        disabled={loading || !newParentId}
                        color="primary"
                    >
                        {translate('ra.action.cancel')}
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        color="primary"
                    >
                        {translate('ra.action.save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
