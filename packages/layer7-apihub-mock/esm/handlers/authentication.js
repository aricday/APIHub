var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { deleteCurrentUser, getCurrentUser, setCurrentUser, } from './currentUser';
import { promisify } from '../promisify';
export function login(database) {
    var _this = this;
    return function (schema, request) { return __awaiter(_this, void 0, void 0, function () {
        var _a, username, password, users, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = JSON.parse(request.requestBody), username = _a.username, password = _a.password;
                    return [4 /*yield*/, promisify(database.userContexts.find().fetch)];
                case 1:
                    users = _b.sent();
                    user = users.find(function (u) { return u.userContexts[0].userDetails.username === username; });
                    if (!user || password !== 'Password@1') {
                        return [2 /*return*/, new Response(401, {}, {
                                respCode: '401',
                                respMsg: "Authentication failed for user '" + username + "'",
                                provider: '',
                                referrer: '',
                            })];
                    }
                    setCurrentUser(user);
                    return [2 /*return*/, {
                            respCode: '200',
                            respMsg: 'Successfully authenticated user',
                            provider: '',
                            referrer: '',
                            dashboardPath: '',
                            gateaugauge: 'mocked-token',
                        }];
            }
        });
    }); };
}
export function getPublicKey(database) {
    return function (schema, request) {
        return {
            respCode: 200,
            respMsg: 'Successfully fetched public key',
            publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgVL6G4zaK+ngqrBheIqP1HcqZIdT8cyHJhvZ9rqOSRdemmvMTFsBoJScPAQQl/jlb7VVVvkGdkvSompszpHaIMQxWG6QuBF23v72nu5NmpYDBsyHZHgIROzqdzqycfKhvWrdDFfq17eZmarsNzvc4KVF3CVv+aM4aXmLPXCIMhrq6M+MYcwMYMS5G6JEYXQtvpw5GQHDm6nfTHNds3wBzooakaOMIldae56jRnX+ILeb+yPWmjsPPwbaOjU2cbygNKMHBfnLEFRz05J2XcGh/DGm4x0s12jnPNiH8hkHd8U8bviwvLlreNBM1XCThL0V07HCETzUPQOhpLtplUh7RwIDAQAB',
        };
    };
}
export function resetPassword(database) {
    return function (schema, request) {
        return {
            status: 200,
        };
    };
}
export function checkUserNameIsUnique(database) {
    var _this = this;
    return function (schema, request) { return __awaiter(_this, void 0, void 0, function () {
        var username, users, usersWithSameUsernameExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = request.queryParams.Name;
                    return [4 /*yield*/, promisify(database.userContexts.find().fetch)];
                case 1:
                    users = _a.sent();
                    usersWithSameUsernameExist = users.some(function (u) { return u.userContexts[0].userDetails.username === username; });
                    if (usersWithSameUsernameExist) {
                        return [2 /*return*/, new Response(401, {}, { errors: ['should be unique'] })];
                    }
                    return [2 /*return*/, {
                            status: 200,
                        }];
            }
        });
    }); };
}
export function passwordResetTokenValidate(database) {
    return function (schema, request) {
        return {
            status: 200,
        };
    };
}
export function updateMyPassword(database) {
    return function (schema, request) {
        return {
            status: 200,
        };
    };
}
export function logout(database) {
    return function (schema, request) {
        deleteCurrentUser();
        return {
            status: 200,
        };
    };
}
export function getAccountSetup(database) {
    return function (schema, request) {
        var token = request.queryParams.token;
        if (token === 'IamLordVoldemort') {
            return {
                status: 200,
                data: {
                    email: 'tom@deathlyhallows.com',
                    firstName: 'Tom Marvolo',
                    lastName: 'Riddle',
                },
            };
        }
        return new Response(401, {}, { errors: ['token not valid'] });
    };
}
export function putAccountSetup(database) {
    return function (schema, request) {
        var token = request.queryParams.token;
        if (token === 'IamLordVoldemort') {
            return {
                status: 200,
            };
        }
        return new Response(401, {}, { errors: ['token not valid'] });
    };
}
export function getUserContexts(database) {
    return function (schema, request) {
        return getCurrentUser();
    };
}
