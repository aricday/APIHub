import React, { useState, useEffect, forwardRef } from 'react';
import { CRUD_CREATE, CRUD_GET_LIST, CRUD_UPDATE, useCreate, useGetList, useLocale, useNotify, useRefresh, useUpdate, useTranslate, useVersion, } from 'ra-core';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { MarkdownEditor, markdownRenderer as defaultMarkdownRenderer, MarkdownView, } from '../ui';
import { documentationLocales } from '../i18n';
import { useUserContext } from '../userContexts';
import { buildDocumentId } from '../dataProvider/documents';
import { InputLabel } from '@material-ui/core';
/**
 * This hook is responsible for fetching the home page markdown content.
 * It returns the markdown directly.
 *
 * @param {Object} options
 * @param {string} options.typeUuid The uuid of the content type to retrieve
 *
 * @example
 * import { useHomePageContent, MarkdownView } from 'layer7-apihub';
 *
 * export const HomePageContent = () => {
 *     const markdown = useHomePageContent();
 *     return <MarkdownView value={markdown} />;
 * }
 */
export const useHomePageContent = ({ entityType = 'home', entityUuid = 'home1', navtitle = 'home1', }) => {
    const locale = useLocale();
    const notify = useNotify();
    const refresh = useRefresh();
    const version = useVersion();
    const id = buildDocumentId(entityType, entityUuid, navtitle, documentationLocales[locale]);
    const { ids, loaded, loading } = useGetList('documents', undefined, undefined, {
        entityType,
        entityUuid,
        locale: documentationLocales[locale],
        fetchTree: false,
        version,
    }, {
        action: CRUD_GET_LIST,
    });
    const [create] = useCreate('documents');
    const [update] = useUpdate('documents');
    // When the user create or update the document, the useGetList hook runs again
    // and returns an empty data while loading. While the result of this new call
    // is loading, the ids array is empty. To avoid rendering an empty content at
    // that moment, we override the ids with the latest loaded ones.
    const defaultIds = useSelector(state => get(state.admin.resources, ['documents', 'list', 'ids'], []));
    const data = useSelector(state => get(state.admin.resources, ['documents', 'data'], {}));
    const documents = (ids.length > 0 ? ids : defaultIds).map(id => data[id]);
    const document = documents.find(doc => doc.navtitle === navtitle);
    const handleSave = markdown => {
        const options = {
            action: !!document ? CRUD_UPDATE : CRUD_CREATE,
            onSuccess: () => {
                notify('resources.documents.notifications.edit_success', 'info', undefined, !!document ? true : false);
                if (!document) {
                    refresh();
                }
            },
            onFailure: () => {
                notify('resources.documents.notifications.edit_error', 'warning');
            },
            undoable: !!document ? true : false,
        };
        if (!!document) {
            update({
                payload: {
                    id,
                    data: Object.assign(Object.assign({}, document), { markdown }),
                },
            }, options);
            return;
        }
        create({
            payload: {
                data: {
                    id,
                    locale: documentationLocales[locale],
                    markdown,
                    navtitle,
                    ordinal: 0,
                    status: 'PUBLISHED',
                    title: navtitle,
                    type: entityType,
                    typeUuid: entityUuid,
                },
            },
        }, options);
    };
    return [{ data: document, loaded, loading }, handleSave];
};
/**
 * This component is responsible for fetching and displaying an home page content.
 * It also provide mechanisms for portal administrators to update it.
 *
 * The HomePageContent can be used as the default home page if there is only one content to display.
 *
 * @example <caption>Simple usage</caption>
 * <HomePageContent />
 *
 * const MyApp = props => <Admin dashboard={HomePageContent} {...props} />
 *
 */
export const HomePageContent = props => {
    var _a, _b;
    const { navtitle = 'home1' } = props;
    const [{ data, loaded }, handleUpdate] = useHomePageContent(props);
    const translate = useTranslate();
    const classes = useStyles();
    const [userContext] = useUserContext();
    const canEdit = ((_b = (_a = userContext) === null || _a === void 0 ? void 0 : _a.userDetails) === null || _b === void 0 ? void 0 : _b.portalAdmin) || false;
    const [mode, setMode] = useState('view');
    const handleToggleEditionMode = () => setMode('edition');
    const handleToggleViewMode = () => setMode('view');
    useEffect(() => {
        setMode('view');
    }, [data]);
    if (!loaded) {
        return (React.createElement(Fade, { in: true, style: {
                transitionDelay: '300ms',
            }, unmountOnExit: true },
            React.createElement(LinearProgress, null)));
    }
    return (React.createElement("div", { className: classes.root },
        React.createElement(MarkdownView, Object.assign({ value: !data
                ? translate('apihub.homepage.placeholder_empty_content')
                : data.markdown }, props)),
        canEdit ? (React.createElement(React.Fragment, null,
            React.createElement(Tooltip, { title: translate(data ? 'ra.action.edit' : 'ra.action.create') },
                React.createElement(Fab, { color: "primary", "aria-label": translate(data ? 'ra.action.edit' : 'ra.action.create'), className: classes.button, onClick: handleToggleEditionMode }, data ? React.createElement(EditIcon, null) : React.createElement(AddIcon, null))),
            React.createElement(HomePageContentEditor, { initialValue: data ? data.markdown : undefined, navtitle: navtitle, onCancel: handleToggleViewMode, onSave: handleUpdate, open: mode === 'edition' }))) : null));
};
const HomePageContentEditor = ({ initialValue, markdownRenderer = defaultMarkdownRenderer, onCancel, onSave, open, navtitle, }) => {
    const classes = useHomePageContentEditorStyles();
    const [value, setValue] = useState(initialValue);
    const translate = useTranslate();
    const handleSave = () => {
        onSave(value);
    };
    const handleCancel = () => {
        setValue(initialValue);
        onCancel();
    };
    return (React.createElement(Dialog, { open: open, fullScreen: true, onClose: handleCancel, TransitionComponent: Transition },
        React.createElement(DialogTitle, null, navtitle),
        React.createElement(DialogContent, null,
            React.createElement(InputLabel, { shrink: true, htmlFor: "textarea" }, translate('resources.documents.fields.markdown')),
            React.createElement(MarkdownEditor, { className: classes.editor, value: value, onChange: setValue, markdownRenderer: markdownRenderer })),
        React.createElement(DialogActions, { className: classes.actions },
            React.createElement(Button, { color: "primary", variant: "outlined", onClick: handleCancel }, translate('resources.documents.actions.cancel')),
            React.createElement(Button, { color: "primary", variant: "contained", onClick: handleSave, startIcon: React.createElement(SaveIcon, null) }, translate('resources.documents.actions.save')))));
};
const Transition = forwardRef(function Transition(props, ref) {
    return React.createElement(Slide, Object.assign({ direction: "up", ref: ref }, props));
});
const useStyles = makeStyles(theme => {
    const appBarHeight = theme.spacing(9); // AppBar (size + margin)
    const homePagePadding = theme.spacing(3); // HomePage (padding)
    return {
        root: {
            position: 'relative',
        },
        button: {
            position: 'fixed',
            right: homePagePadding,
            top: `calc(${appBarHeight}px + ${homePagePadding}px)`,
        },
    };
});
const useHomePageContentEditorStyles = makeStyles(theme => ({
    editor: {
        height: `calc(100% - ${theme.spacing(2)}px)`,
    },
    actions: {
        margin: theme.spacing(2),
    },
}));
//# sourceMappingURL=HomePageContent.js.map