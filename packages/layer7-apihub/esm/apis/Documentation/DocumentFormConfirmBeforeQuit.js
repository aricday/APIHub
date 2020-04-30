import React from 'react';
import { useTranslate } from 'react-admin';
import { Prompt } from 'react-router-dom';
export const DocumentFormConfirmBeforeQuit = ({ when }) => {
    const translate = useTranslate();
    return (React.createElement(Prompt, { when: when, message: () => translate('resources.documents.notifications.unsaved_changes') }));
};
//# sourceMappingURL=DocumentFormConfirmBeforeQuit.js.map