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
import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { useTranslate } from 'ra-core';
import { useListDisplay, LIST_DISPLAY_CARDS, LIST_DISPLAY_DATAGRID, } from './ListDisplayContext';
export const ListDisplayButton = props => {
    const [display, setDisplay] = useListDisplay();
    const handleChange = (event, value) => {
        setDisplay(value);
    };
    return (React.createElement(ToggleButtonGroup, Object.assign({ exclusive: true, onChange: handleChange, value: display, size: "small" }, props),
        React.createElement(ToggleButtonWithTooltip, { label: "apihub.actions.view_as_cards", value: LIST_DISPLAY_CARDS },
            React.createElement(ViewModuleIcon, null)),
        React.createElement(ToggleButtonWithTooltip, { label: "apihub.actions.view_as_list", value: LIST_DISPLAY_DATAGRID },
            React.createElement(ViewListIcon, null))));
};
const ToggleButtonWithTooltip = (_a) => {
    var { label, title = label } = _a, props = __rest(_a, ["label", "title"]);
    const translate = useTranslate();
    const translatedLabel = translate(label, { _: label });
    const translatedTitle = translate(title, { _: title });
    return (React.createElement(Tooltip, { title: translatedTitle },
        React.createElement(ToggleButton, Object.assign({ "aria-label": translatedLabel }, props))));
};
//# sourceMappingURL=ListDisplayButton.js.map