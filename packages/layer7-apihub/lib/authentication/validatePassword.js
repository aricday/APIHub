"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ra_core_1 = require("ra-core");
exports.validatePassword = ra_core_1.composeValidators([
    ra_core_1.minLength(8),
    ra_core_1.maxLength(60),
    ra_core_1.regex(/[a-z]+/, 'apihub.validation.password.at_least_one_lowercase_character'),
    ra_core_1.regex(/[A-Z]+/, 'apihub.validation.password.at_least_one_uppercase_character'),
    ra_core_1.regex(/\d+/, 'apihub.validation.password.at_least_one_number'),
    ra_core_1.regex(/[!@#$%^&*-]+/, 'apihub.validation.password.at_least_one_special_character'),
]);
//# sourceMappingURL=validatePassword.js.map