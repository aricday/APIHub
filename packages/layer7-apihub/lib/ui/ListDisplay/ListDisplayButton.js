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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ToggleButton_1 = __importDefault(require("@material-ui/lab/ToggleButton"));
const ToggleButtonGroup_1 = __importDefault(require("@material-ui/lab/ToggleButtonGroup"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const ViewList_1 = __importDefault(require("@material-ui/icons/ViewList"));
const ViewModule_1 = __importDefault(require("@material-ui/icons/ViewModule"));
const ra_core_1 = require("ra-core");
const ListDisplayContext_1 = require("./ListDisplayContext");
exports.ListDisplayButton = props => {
    const [display, setDisplay] = ListDisplayContext_1.useListDisplay();
    const handleChange = (event, value) => {
        setDisplay(value);
    };
    return (react_1.default.createElement(ToggleButtonGroup_1.default, Object.assign({ exclusive: true, onChange: handleChange, value: display, size: "small" }, props),
        react_1.default.createElement(ToggleButtonWithTooltip, { label: "apihub.actions.view_as_cards", value: ListDisplayContext_1.LIST_DISPLAY_CARDS },
            react_1.default.createElement(ViewModule_1.default, null)),
        react_1.default.createElement(ToggleButtonWithTooltip, { label: "apihub.actions.view_as_list", value: ListDisplayContext_1.LIST_DISPLAY_DATAGRID },
            react_1.default.createElement(ViewList_1.default, null))));
};
const ToggleButtonWithTooltip = (_a) => {
    var { label, title = label } = _a, props = __rest(_a, ["label", "title"]);
    const translate = ra_core_1.useTranslate();
    const translatedLabel = translate(label, { _: label });
    const translatedTitle = translate(title, { _: title });
    return (react_1.default.createElement(Tooltip_1.default, { title: translatedTitle },
        react_1.default.createElement(ToggleButton_1.default, Object.assign({ "aria-label": translatedLabel }, props))));
};
//# sourceMappingURL=ListDisplayButton.js.map