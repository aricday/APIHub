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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const Sort_1 = __importDefault(require("@material-ui/icons/Sort"));
const styles_1 = require("@material-ui/core/styles");
const react_redux_1 = require("react-redux");
const ra_core_1 = require("ra-core");
const react_router_dom_1 = require("react-router-dom");
const query_string_1 = require("query-string");
/**
 * A sort button to use on a list which does not display a datagrid.
 *
 * @param {String} resource The resource on which to apply the sort
 * @param {Object} currentSort The current sort
 * @param {Object} currentSort.field The currently sorted field (eg: "name")
 * @param {Object} currentSort.order The current sort order (eg: "ASC")
 *
 * @example <caption>Usage inside a custom toolbar for a <List></caption>
 * import { TopToolbar } from 'react-admin';
 *
 * const ApiListActions = ({
 *     currentSort, // injected by react-admin
 *     resource, // injected by react-admin
 *     ...props
 * }) => {
 *     return (
 *         <TopToolbar
 *             className={classnames(classes.root, className)}
 *             {...sanitizeListRestProps(props)}
 *         >
 *             <SortButton resource={resource} currentSort={currentSort}>
 *                 <SortMenuItem
 *                     label="resources.apis.list.sort.name.asc" // Will be translated
 *                     sort={{ field: 'name', order: 'ASC' }}
 *                 />
 *                 <SortMenuItem
 *                     label="resources.apis.list.sort.name.desc" // Will be translated
 *                     sort={{ field: 'name', order: 'DESC' }}
 *                 />
 *             </SortButton>
 *         </TopToolbar>
 *     );
 * };
 */
exports.SortButton = ({ children, resource, currentSort }) => {
    const [currentSortLabel, setCurrentSortLabel] = react_1.useState();
    const [anchorEl, setAnchorEl] = react_1.useState(null);
    const translate = ra_core_1.useTranslate();
    const dispatch = react_redux_1.useDispatch();
    const history = react_router_dom_1.useHistory();
    const classes = useStyles();
    const listParams = react_redux_1.useSelector(reduxState => reduxState.admin.resources[resource]
        ? reduxState.admin.resources[resource].list.params
        : {}, react_redux_1.shallowEqual);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (event, sortData) => {
        history.push({
            search: `?${query_string_1.stringify(Object.assign(Object.assign({}, listParams), { filter: JSON.stringify(listParams.filter), sort: sortData.sort.field, order: sortData.sort.order }))}`,
        });
        dispatch(ra_core_1.changeListParams(resource, Object.assign(Object.assign({}, listParams), { sort: sortData.sort.field, order: sortData.sort.order })));
        handleClose();
    };
    react_1.useEffect(() => {
        const childrenAsArray = react_1.Children.toArray(children);
        if (childrenAsArray.length === 0) {
            return;
        }
        let selectedChild = childrenAsArray.find(child => child.props.sort.field === currentSort.field &&
            child.props.sort.order === currentSort.order);
        if (!selectedChild) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('The current sort parameters do not match the provided children');
            }
            selectedChild = childrenAsArray[0];
        }
        setCurrentSortLabel(translate(selectedChild.props.label));
    }, [children, currentSort, translate]);
    return currentSortLabel ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.default, { "aria-controls": "sort-menu", "aria-label": currentSortLabel, "aria-haspopup": "true", onClick: handleClick, startIcon: react_1.default.createElement(Sort_1.default, null), endIcon: react_1.default.createElement(ArrowDropDown_1.default, null), className: classes.root, size: "small", color: "primary" }, currentSortLabel),
        react_1.default.createElement(Menu_1.default, { id: "sort-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, react_1.Children.map(children, child => react_1.cloneElement(child, Object.assign({ onClick: handleMenuItemClick }, child.props)))))) : null;
};
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(),
    },
}));
exports.SortMenuItem = react_1.forwardRef(({ label, sort, onClick }, ref) => {
    const translate = ra_core_1.useTranslate();
    const handleClick = event => {
        onClick(event, { label, sort });
    };
    return (react_1.default.createElement(MenuItem_1.default, { ref: ref, onClick: handleClick }, translate(label, { _: label })));
});
//# sourceMappingURL=SortButton.js.map