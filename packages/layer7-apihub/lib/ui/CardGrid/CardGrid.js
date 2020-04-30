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
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const styles_1 = require("@material-ui/core/styles");
const react_router_dom_1 = require("react-router-dom");
const ra_core_1 = require("ra-core");
const useStyles = styles_1.makeStyles(theme => ({
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
exports.LoadingCardGrid = ({ nbItems = 10 }) => {
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(Grid_1.default, { container: true, className: classes.gridList }, times(nbItems, key => (react_1.default.createElement(Grid_1.default, { item: true, key: key },
            react_1.default.createElement("div", { className: classes.placeholder })))))));
};
exports.LoadedCardGrid = ({ basePath, children, data, ids, resource, rowClick, spacing = 2, }) => {
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(Grid_1.default, { className: classes.gridList, container: true, spacing: spacing }, ids.map(id => (react_1.default.createElement(exports.CardGridItem, { key: id, id: id, basePath: basePath, record: data[id], resource: resource, rowClick: rowClick }, children))))));
};
exports.CardGrid = (_a) => {
    var { loaded } = _a, props = __rest(_a, ["loaded"]);
    return loaded ? react_1.default.createElement(exports.LoadedCardGrid, Object.assign({}, props)) : react_1.default.createElement(exports.LoadingCardGrid, Object.assign({}, props));
};
exports.CardGridItem = (_a) => {
    var { basePath, children, id, record, resource, rowClick, xsSize = 12, smSize = 6, mdSize = 4, lgSize = 3, xlSize = 3 } = _a, props = __rest(_a, ["basePath", "children", "id", "record", "resource", "rowClick", "xsSize", "smSize", "mdSize", "lgSize", "xlSize"]);
    const history = react_router_dom_1.useHistory();
    const handleClick = react_1.useCallback(async (event) => {
        if (!rowClick)
            return;
        event.persist();
        const effect = typeof rowClick === 'function'
            ? await rowClick(id, basePath, record)
            : rowClick;
        switch (effect) {
            case 'edit':
                history.push(ra_core_1.linkToRecord(basePath, id));
                return;
            case 'show':
                history.push(ra_core_1.linkToRecord(basePath, id, 'show'));
                return;
            default:
                if (effect)
                    history.push(effect);
                return;
        }
    }, [basePath, history, id, record, rowClick]);
    return (react_1.default.createElement(Grid_1.default, Object.assign({ item: true, onClick: handleClick, xs: xsSize, sm: smSize, md: mdSize, lg: lgSize, xl: xlSize }, props), react_1.cloneElement(children, {
        basePath,
        id,
        record,
        resource,
    })));
};
//# sourceMappingURL=CardGrid.js.map