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
const ra_core_1 = require("ra-core");
const get_1 = __importDefault(require("lodash/get"));
const react_redux_1 = require("react-redux");
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const Fab_1 = __importDefault(require("@material-ui/core/Fab"));
const Fade_1 = __importDefault(require("@material-ui/core/Fade"));
const LinearProgress_1 = __importDefault(require("@material-ui/core/LinearProgress"));
const Slide_1 = __importDefault(require("@material-ui/core/Slide"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const styles_1 = require("@material-ui/core/styles");
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
const Save_1 = __importDefault(require("@material-ui/icons/Save"));
const ui_1 = require("../ui");
const i18n_1 = require("../i18n");
const userContexts_1 = require("../userContexts");
const documents_1 = require("../dataProvider/documents");
const core_1 = require("@material-ui/core");
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
exports.useHomePageContent = ({ entityType = 'home', entityUuid = 'home1', navtitle = 'home1', }) => {
    const locale = ra_core_1.useLocale();
    const notify = ra_core_1.useNotify();
    const refresh = ra_core_1.useRefresh();
    const version = ra_core_1.useVersion();
    const id = documents_1.buildDocumentId(entityType, entityUuid, navtitle, i18n_1.documentationLocales[locale]);
    const { ids, loaded, loading } = ra_core_1.useGetList('documents', undefined, undefined, {
        entityType,
        entityUuid,
        locale: i18n_1.documentationLocales[locale],
        fetchTree: false,
        version,
    }, {
        action: ra_core_1.CRUD_GET_LIST,
    });
    const [create] = ra_core_1.useCreate('documents');
    const [update] = ra_core_1.useUpdate('documents');
    // When the user create or update the document, the useGetList hook runs again
    // and returns an empty data while loading. While the result of this new call
    // is loading, the ids array is empty. To avoid rendering an empty content at
    // that moment, we override the ids with the latest loaded ones.
    const defaultIds = react_redux_1.useSelector(state => get_1.default(state.admin.resources, ['documents', 'list', 'ids'], []));
    const data = react_redux_1.useSelector(state => get_1.default(state.admin.resources, ['documents', 'data'], {}));
    const documents = (ids.length > 0 ? ids : defaultIds).map(id => data[id]);
    const document = documents.find(doc => doc.navtitle === navtitle);
    const handleSave = markdown => {
        const options = {
            action: !!document ? ra_core_1.CRUD_UPDATE : ra_core_1.CRUD_CREATE,
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
                    locale: i18n_1.documentationLocales[locale],
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
exports.HomePageContent = props => {
    var _a, _b;
    const { navtitle = 'home1' } = props;
    const [{ data, loaded }, handleUpdate] = exports.useHomePageContent(props);
    const translate = ra_core_1.useTranslate();
    const classes = useStyles();
    const [userContext] = userContexts_1.useUserContext();
    const canEdit = ((_b = (_a = userContext) === null || _a === void 0 ? void 0 : _a.userDetails) === null || _b === void 0 ? void 0 : _b.portalAdmin) || false;
    const [mode, setMode] = react_1.useState('view');
    const handleToggleEditionMode = () => setMode('edition');
    const handleToggleViewMode = () => setMode('view');
    react_1.useEffect(() => {
        setMode('view');
    }, [data]);
    if (!loaded) {
        return (react_1.default.createElement(Fade_1.default, { in: true, style: {
                transitionDelay: '300ms',
            }, unmountOnExit: true },
            react_1.default.createElement(LinearProgress_1.default, null)));
    }
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(ui_1.MarkdownView, Object.assign({ value: !data
                ? translate('apihub.homepage.placeholder_empty_content')
                : data.markdown }, props)),
        canEdit ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Tooltip_1.default, { title: translate(data ? 'ra.action.edit' : 'ra.action.create') },
                react_1.default.createElement(Fab_1.default, { color: "primary", "aria-label": translate(data ? 'ra.action.edit' : 'ra.action.create'), className: classes.button, onClick: handleToggleEditionMode }, data ? react_1.default.createElement(Edit_1.default, null) : react_1.default.createElement(Add_1.default, null))),
            react_1.default.createElement(HomePageContentEditor, { initialValue: data ? data.markdown : undefined, navtitle: navtitle, onCancel: handleToggleViewMode, onSave: handleUpdate, open: mode === 'edition' }))) : null));
};
const HomePageContentEditor = ({ initialValue, markdownRenderer = ui_1.markdownRenderer, onCancel, onSave, open, navtitle, }) => {
    const classes = useHomePageContentEditorStyles();
    const [value, setValue] = react_1.useState(initialValue);
    const translate = ra_core_1.useTranslate();
    const handleSave = () => {
        onSave(value);
    };
    const handleCancel = () => {
        setValue(initialValue);
        onCancel();
    };
    return (react_1.default.createElement(Dialog_1.default, { open: open, fullScreen: true, onClose: handleCancel, TransitionComponent: Transition },
        react_1.default.createElement(DialogTitle_1.default, null, navtitle),
        react_1.default.createElement(DialogContent_1.default, null,
            react_1.default.createElement(core_1.InputLabel, { shrink: true, htmlFor: "textarea" }, translate('resources.documents.fields.markdown')),
            react_1.default.createElement(ui_1.MarkdownEditor, { className: classes.editor, value: value, onChange: setValue, markdownRenderer: markdownRenderer })),
        react_1.default.createElement(DialogActions_1.default, { className: classes.actions },
            react_1.default.createElement(Button_1.default, { color: "primary", variant: "outlined", onClick: handleCancel }, translate('resources.documents.actions.cancel')),
            react_1.default.createElement(Button_1.default, { color: "primary", variant: "contained", onClick: handleSave, startIcon: react_1.default.createElement(Save_1.default, null) }, translate('resources.documents.actions.save')))));
};
const Transition = react_1.forwardRef(function Transition(props, ref) {
    return react_1.default.createElement(Slide_1.default, Object.assign({ direction: "up", ref: ref }, props));
});
const useStyles = styles_1.makeStyles(theme => {
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
const useHomePageContentEditorStyles = styles_1.makeStyles(theme => ({
    editor: {
        height: `calc(100% - ${theme.spacing(2)}px)`,
    },
    actions: {
        margin: theme.spacing(2),
    },
}));
//# sourceMappingURL=HomePageContent.js.map