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
import React, { cloneElement, useCallback } from 'react';
import MuiGrid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { linkToRecord } from 'ra-core';
const useStyles = makeStyles(theme => ({
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: -theme.spacing(),
        marginRight: -theme.spacing(),
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
}));
const times = (nbChildren, fn) => Array.from({ length: nbChildren }, (_, key) => fn(key));
export const LoadingCardGrid = ({ nbItems = 10 }) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(MuiGrid, { container: true, className: classes.gridList }, times(nbItems, key => (React.createElement(MuiGrid, { item: true, key: key },
            React.createElement("div", { className: classes.placeholder })))))));
};
export const LoadedCardGrid = ({ basePath, children, data, ids, resource, rowClick, spacing = 2, }) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(MuiGrid, { className: classes.gridList, container: true, spacing: spacing }, ids.map(id => (React.createElement(CardGridItem, { key: id, id: id, basePath: basePath, record: data[id], resource: resource, rowClick: rowClick }, children))))));
};
export const CardGrid = (_a) => {
    var { loaded } = _a, props = __rest(_a, ["loaded"]);
    return loaded ? React.createElement(LoadedCardGrid, Object.assign({}, props)) : React.createElement(LoadingCardGrid, Object.assign({}, props));
};
export const CardGridItem = (_a) => {
    var { basePath, children, id, record, resource, rowClick, xsSize = 12, smSize = 6, mdSize = 4, lgSize = 3, xlSize = 3 } = _a, props = __rest(_a, ["basePath", "children", "id", "record", "resource", "rowClick", "xsSize", "smSize", "mdSize", "lgSize", "xlSize"]);
    const history = useHistory();
    const handleClick = useCallback(async (event) => {
        if (!rowClick)
            return;
        event.persist();
        const effect = typeof rowClick === 'function'
            ? await rowClick(id, basePath, record)
            : rowClick;
        switch (effect) {
            case 'edit':
                history.push(linkToRecord(basePath, id));
                return;
            case 'show':
                history.push(linkToRecord(basePath, id, 'show'));
                return;
            default:
                if (effect)
                    history.push(effect);
                return;
        }
    }, [basePath, history, id, record, rowClick]);
    return (React.createElement(MuiGrid, Object.assign({ item: true, onClick: handleClick, xs: xsSize, sm: smSize, md: mdSize, lg: lgSize, xl: xlSize }, props), cloneElement(children, {
        basePath,
        id,
        record,
        resource,
    })));
};
//# sourceMappingURL=CardGrid.js.map