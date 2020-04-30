"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_1 = __importDefault(require("./en"));
const es_1 = __importDefault(require("./es"));
const fr_1 = __importDefault(require("./fr"));
exports.frenchMessages = fr_1.default;
exports.spanishMessages = es_1.default;
exports.englishMessages = en_1.default;
__export(require("./i18nProvider"));
__export(require("./LocaleSwitcherMenu"));
__export(require("./supportedLocales"));
//# sourceMappingURL=index.js.map