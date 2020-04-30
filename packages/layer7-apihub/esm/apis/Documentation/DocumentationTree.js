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
import React, { forwardRef, useMemo, useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core';
import get from 'lodash/get';
import { useTranslate } from 'ra-core';
export const DocumentationTree = ({ items, onDocumentSelected, selectedDocumentId, expanded: controlledExpanded, onExpandedChange, }) => {
    const [uncontrolledExpanded, setExpanded] = useState(items.filter(item => !item.parentUuid).map(item => item.id));
    const expanded = controlledExpanded || uncontrolledExpanded;
    const tree = useMemo(() => getDocumentationTree(items, sortByOrdinal), [
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
    return (React.createElement(TreeView, { defaultEndIcon: React.createElement("div", { style: { width: 24 } }), expanded: expanded, onNodeToggle: handleNodeToggle, selected: selectedDocumentId }, tree.map(item => (React.createElement(RecursiveTreeItem, { key: item.id, node: item, nodeId: item.id, onSelect: handleSelectDocument, onCollapse: handleCollapse, onExpand: handleExpand })))));
};
const RecursiveTreeItem = forwardRef((props, ref) => {
    const { node, onSelect, onExpand, onCollapse } = props, rest = __rest(props, ["node", "onSelect", "onExpand", "onCollapse"]);
    const classes = useRecursiveTreeItemStyles(props);
    const translate = useTranslate();
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
    return (React.createElement(TreeItem, Object.assign({ classes: classes, label: node.title, onClick: handleClick, collapseIcon: React.createElement(ArrowDropDownIcon, { role: "button", "aria-label": translate('resources.apis.collapse_documentation', {
                title: node.title,
                _: `resources.apis.collapse_documentation.${node.title}`,
            }), onClick: handleCollapse }), expandIcon: React.createElement(ArrowRightIcon, { role: "button", "aria-label": translate('resources.apis.expand_documentation', {
                title: node.title,
                _: `resources.apis.expand_documentation.${node.title}`,
            }), onClick: handleExpand }), ref: ref, onKeyDown: handleKeyDown }, rest), node.children && node.children.length > 0
        ? node.children.map(child => (React.createElement(RecursiveTreeItem, { key: child.id, node: child, nodeId: child.id, onSelect: onSelect, onExpand: onExpand, onCollapse: onCollapse })))
        : null));
});
const useRecursiveTreeItemStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(1),
        paddingLeft: 0,
    },
    label: {},
}));
export const sortByOrdinal = (a, b) => a.ordinal - b.ordinal;
export const getDocumentationTree = (items, sortFn = a => a) => {
    return items
        .filter(item => !item.parentUuid)
        .reduce((acc, item) => {
        item.children = getChildDocuments(item, items);
        acc.push(item);
        return acc;
    }, [])
        .sort(sortFn);
};
export const getChildDocuments = (parent, items, sortFn = a => a) => {
    return items
        .filter(item => item.parentUuid === parent.uuid && !!parent.uuid)
        .reduce((acc, item) => {
        item.children = getChildDocuments(item, items);
        acc.push(item);
        return acc;
    }, [])
        .sort(sortFn);
};
export const getSiblingsDocuments = (items = [], parentUuid = undefined) => {
    if (parentUuid === undefined) {
        return items;
    }
    let i = 0;
    while (i < items.length) {
        const item = items[i];
        const children = get(item, 'children', []);
        if (item.uuid === parentUuid) {
            return children;
        }
        const result = getSiblingsDocuments(children, parentUuid);
        if (result.length > 0) {
            return result;
        }
        i++;
    }
    return [];
};
export const documentHasChildren = (items, document) => {
    return items.some(node => node.parentUuid === document.uuid);
};
export const getMaxOrdinalFromDocuments = items => {
    if (!Array.isArray(items) || items.length === 0) {
        return -1;
    }
    const sortedSiblingsItems = items.sort((itemA, itemB) => itemB.ordinal - itemA.ordinal);
    return sortedSiblingsItems[0].ordinal;
};
//# sourceMappingURL=DocumentationTree.js.map