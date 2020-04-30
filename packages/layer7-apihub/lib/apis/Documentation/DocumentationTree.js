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
const TreeView_1 = __importDefault(require("@material-ui/lab/TreeView"));
const TreeItem_1 = __importDefault(require("@material-ui/lab/TreeItem"));
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const ArrowRight_1 = __importDefault(require("@material-ui/icons/ArrowRight"));
const core_1 = require("@material-ui/core");
const get_1 = __importDefault(require("lodash/get"));
const ra_core_1 = require("ra-core");
exports.DocumentationTree = ({ items, onDocumentSelected, selectedDocumentId, expanded: controlledExpanded, onExpandedChange, }) => {
    const [uncontrolledExpanded, setExpanded] = react_1.useState(items.filter(item => !item.parentUuid).map(item => item.id));
    const expanded = controlledExpanded || uncontrolledExpanded;
    const tree = react_1.useMemo(() => exports.getDocumentationTree(items, exports.sortByOrdinal), [
        items,
    ]);
    const handleExpandedChange = newExpanded => {
        if (onExpandedChange) {
            return onExpandedChange(newExpanded);
        }
        setExpanded(newExpanded);
    };
    const handleSelectDocument = (event, node) => {
        event.preventDefault();
        onDocumentSelected(node);
    };
    const handleCollapse = (event, nodeId) => handleExpandedChange(expanded.filter(item => item !== nodeId));
    const handleExpand = (event, nodeId) => handleExpandedChange([...expanded, nodeId]);
    const handleNodeToggle = (event, nodes) => handleExpandedChange(nodes);
    return (react_1.default.createElement(TreeView_1.default, { defaultEndIcon: react_1.default.createElement("div", { style: { width: 24 } }), expanded: expanded, onNodeToggle: handleNodeToggle, selected: selectedDocumentId }, tree.map(item => (react_1.default.createElement(RecursiveTreeItem, { key: item.id, node: item, nodeId: item.id, onSelect: handleSelectDocument, onCollapse: handleCollapse, onExpand: handleExpand })))));
};
const RecursiveTreeItem = react_1.forwardRef((props, ref) => {
    const { node, onSelect, onExpand, onCollapse } = props, rest = __rest(props, ["node", "onSelect", "onExpand", "onCollapse"]);
    const classes = useRecursiveTreeItemStyles(props);
    const translate = ra_core_1.useTranslate();
    const handleClick = event => {
        // If the node does not have an uuid, it's a new document
        // and it shouldn't handle collapse, expand or select
        if (node && node.uuid && onSelect) {
            onSelect(event, node);
        }
    };
    const handleCollapse = event => {
        // Stop event propagation to avoid loading the node
        event.stopPropagation();
        // If the node does not have an uuid, it's a new document
        // and it shouldn't handle collapse, expand or select
        if (node && node.uuid && onCollapse) {
            onCollapse(event, node.id);
        }
    };
    const handleExpand = event => {
        // Stop event propagation to avoid loading the node
        event.stopPropagation();
        // If the node does not have an uuid, it's a new document
        // and it shouldn't handle collapse, expand or select
        if (node && node.uuid && onExpand) {
            onExpand(event, node.id);
        }
    };
    const handleKeyDown = event => {
        if (event.altKey || event.currentTarget !== event.target) {
            return;
        }
        if (event.key === 'Enter') {
            onSelect(event, node);
        }
    };
    return (react_1.default.createElement(TreeItem_1.default, Object.assign({ classes: classes, label: node.title, onClick: handleClick, collapseIcon: react_1.default.createElement(ArrowDropDown_1.default, { role: "button", "aria-label": translate('resources.apis.collapse_documentation', {
                title: node.title,
                _: `resources.apis.collapse_documentation.${node.title}`,
            }), onClick: handleCollapse }), expandIcon: react_1.default.createElement(ArrowRight_1.default, { role: "button", "aria-label": translate('resources.apis.expand_documentation', {
                title: node.title,
                _: `resources.apis.expand_documentation.${node.title}`,
            }), onClick: handleExpand }), ref: ref, onKeyDown: handleKeyDown }, rest), node.children && node.children.length > 0
        ? node.children.map(child => (react_1.default.createElement(RecursiveTreeItem, { key: child.id, node: child, nodeId: child.id, onSelect: onSelect, onExpand: onExpand, onCollapse: onCollapse })))
        : null));
});
const useRecursiveTreeItemStyles = core_1.makeStyles(theme => ({
    content: {
        padding: theme.spacing(1),
        paddingLeft: 0,
    },
    label: {},
}));
exports.sortByOrdinal = (a, b) => a.ordinal - b.ordinal;
exports.getDocumentationTree = (items, sortFn = a => a) => {
    return items
        .filter(item => !item.parentUuid)
        .reduce((acc, item) => {
        item.children = exports.getChildDocuments(item, items);
        acc.push(item);
        return acc;
    }, [])
        .sort(sortFn);
};
exports.getChildDocuments = (parent, items, sortFn = a => a) => {
    return items
        .filter(item => item.parentUuid === parent.uuid && !!parent.uuid)
        .reduce((acc, item) => {
        item.children = exports.getChildDocuments(item, items);
        acc.push(item);
        return acc;
    }, [])
        .sort(sortFn);
};
exports.getSiblingsDocuments = (items = [], parentUuid = undefined) => {
    if (parentUuid === undefined) {
        return items;
    }
    let i = 0;
    while (i < items.length) {
        const item = items[i];
        const children = get_1.default(item, 'children', []);
        if (item.uuid === parentUuid) {
            return children;
        }
        const result = exports.getSiblingsDocuments(children, parentUuid);
        if (result.length > 0) {
            return result;
        }
        i++;
    }
    return [];
};
exports.documentHasChildren = (items, document) => {
    return items.some(node => node.parentUuid === document.uuid);
};
exports.getMaxOrdinalFromDocuments = items => {
    if (!Array.isArray(items) || items.length === 0) {
        return -1;
    }
    const sortedSiblingsItems = items.sort((itemA, itemB) => itemB.ordinal - itemA.ordinal);
    return sortedSiblingsItems[0].ordinal;
};
//# sourceMappingURL=DocumentationTree.js.map