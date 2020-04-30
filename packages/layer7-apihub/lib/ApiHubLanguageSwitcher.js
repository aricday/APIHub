"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ra_core_1 = require("ra-core");
const i18n_1 = require("./i18n");
const preferences_1 = require("./preferences");
exports.ApiHubLanguageSwitcher = () => {
    const setLocale = ra_core_1.useSetLocale();
    const locale = ra_core_1.useLocale();
    const [localePreference, writeLocalePreference] = preferences_1.useApiHubPreference('locale');
    react_1.useEffect(() => {
        if (!i18n_1.supportedLocales[localePreference]) {
            writeLocalePreference(i18n_1.defaultLocale);
            return;
        }
        if (localePreference !== locale) {
            setLocale(localePreference);
        }
    }, [locale, localePreference, setLocale, writeLocalePreference]);
    const handleLocaleChange = newLocale => {
        writeLocalePreference(newLocale);
    };
    return (react_1.default.createElement(i18n_1.LocaleSwitcherMenu, { locale: locale, locales: i18n_1.supportedLocales, onChange: handleLocaleChange }));
};
//# sourceMappingURL=ApiHubLanguageSwitcher.js.map