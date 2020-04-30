"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
const en_1 = __importDefault(require("./en"));
const es_1 = __importDefault(require("./es"));
const fr_1 = __importDefault(require("./fr"));
exports.i18nProvider = (defaultLocale = 'en') => ra_i18n_polyglot_1.default(locale => {
    if (locale === 'en') {
        return en_1.default;
    }
    if (locale === 'es') {
        return es_1.default;
    }
    if (locale === 'fr') {
        return fr_1.default;
    }
}, defaultLocale // Default locale
);
//# sourceMappingURL=i18nProvider.js.map