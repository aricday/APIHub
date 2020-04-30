import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconEdit from '@material-ui/icons/Edit';
import IconDelete from '@material-ui/icons/Delete';
import IconAdd from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'ra-core';

import { DeleteDocumentButton } from './DeleteDocumentButton';
import { ChangeParentDocumentButton } from './ChangeParentDocumentButton';

/**
 * The toolbar displayed at the top of the document view
 */
export const DocumentToolbar = ({
    allDocuments,
    disabled,
    document,
    entityType,
    entityUuid,
    locale,
    hasChildren,
    userCanEdit,
    userCanAdd,
    userCanDelete,
    onEdit,
    onAddNewDocument,
    onDeleteDocument,
}) => {
    const classes = useToolbarStyles();
    const translate = useTranslate();

    if (!document || (!userCanEdit && !userCanDelete)) {
        return null;
    }

    return (
        <>
            <div className={classes.root}>
                {userCanAdd && (
                    <AddDocumentButton
                        document={document}
                        color="primary"
                        size="small"
                        onClick={onAddNewDocument}
                        disabled={disabled}
                        className={classes.button}
                        aria-label={translate(
                            'resources.apis.documentation.actions.new_child_document_button'
                        )}
                        startIcon={<IconAdd />}
                    >
                        {translate(
                            'resources.apis.documentation.actions.new_child_document_button'
                        )}
                    </AddDocumentButton>
                )}
                {userCanEdit && (
                    <Button
                        color="primary"
                        size="small"
                        onClick={onEdit}
                        disabled={disabled}
                        className={classes.button}
                        aria-label={translate(
                            'resources.apis.documentation.actions.edit_document_button'
                        )}
                        startIcon={<IconEdit />}
                    >
                        {translate(
                            'resources.apis.documentation.actions.edit_document_button'
                        )}
                    </Button>
                )}
                {userCanEdit && (
                    <ChangeParentDocumentButton
                        color="primary"
                        size="small"
                        disabled={disabled}
                        className={classes.button}
                        allDocuments={allDocuments}
                        document={document}
                        entityType={entityType}
                        entityUuid={entityUuid}
                        locale={locale}
                    />
                )}
                {userCanDelete && (
                    <DeleteDocumentButton
                        document={document}
                        entityType={entityType}
                        entityUuid={entityUuid}
                        hasChildren={hasChildren}
                        color="primary"
                        size="small"
                        onClick={onDeleteDocument}
                        disabled={disabled}
                        className={classes.button}
                        aria-label={translate(
                            'resources.apis.documentation.actions.delete_document_button'
                        )}
                        startIcon={<IconDelete />}
                    >
                        {translate(
                            'resources.apis.documentation.actions.delete_document_button'
                        )}
                    </DeleteDocumentButton>
                )}
            </div>
            <Divider />
        </>
    );
};

const AddDocumentButton = ({ document, onClick, ...rest }) => {
    const handleAddNewDocument = () => {
        onClick(document);
    };

    return <Button onClick={handleAddNewDocument} {...rest}></Button>;
};

const useToolbarStyles = makeStyles(
    theme => ({
        root: {
            padding: theme.spacing(1),
        },
        button: {
            '& + &': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
    { name: 'Layer7DocumentationToolbar' }
);
