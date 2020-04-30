"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenUrlRegExp = /.*#token\/(.+)/;
exports.extractTokenFromUrl = url => {
    const matches = TokenUrlRegExp.exec(url);
    if (matches && matches.length > 1) {
        return matches[1];
    }
    return null;
};
//# sourceMappingURL=extractTokenFromUrl.js.map