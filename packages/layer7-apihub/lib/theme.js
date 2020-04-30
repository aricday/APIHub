"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_admin_1 = require("react-admin");
const defaultTheme_1 = __importDefault(require("@material-ui/core/styles/defaultTheme"));
const blue_1 = __importDefault(require("@material-ui/core/colors/blue"));
exports.theme = Object.assign(Object.assign({}, react_admin_1.defaultTheme), { palette: Object.assign(Object.assign({}, react_admin_1.defaultTheme.palette), { secondary: Object.assign(Object.assign({}, react_admin_1.defaultTheme.palette.secondary), { light: '#6ec6ff', main: '#43425D', dark: '#0069c0', contrastText: defaultTheme_1.default.palette.common.white }) }), overrides: {
        RaMenuItemLink: {
            root: {
                color: defaultTheme_1.default.palette.common.white,
                borderLeftColor: 'transparent',
                borderLeftWidth: defaultTheme_1.default.spacing(0.5),
                borderLeftStyle: 'solid',
                paddingTop: defaultTheme_1.default.spacing(2),
                paddingBottom: defaultTheme_1.default.spacing(2),
            },
            active: {
                borderLeftColor: blue_1.default[800],
                borderLeftWidth: defaultTheme_1.default.spacing(0.5),
                borderLeftStyle: 'solid',
                backgroundColor: defaultTheme_1.default.palette.action.selected,
                color: defaultTheme_1.default.palette.common.white,
                '& svg': {
                    color: '#a3a0fb',
                },
            },
            icon: {
                color: defaultTheme_1.default.palette.common.white,
            },
        },
    } });
//# sourceMappingURL=theme.js.map