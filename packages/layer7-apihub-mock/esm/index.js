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
import { Model, Server } from 'miragejs';
import minimongo from 'minimongo';
import defaultData from './defaultData.json';
import { login, getPublicKey, resetPassword, checkUserNameIsUnique, passwordResetTokenValidate, updateMyPassword, logout, getAccountSetup, putAccountSetup, getUserContexts, } from './handlers/authentication';
import { listApis, getApi, listApiPermissions, getApiSpecContent, } from './handlers/apis';
import { listApplications } from './handlers/applications';
import { listDocuments, getDocumentsTree, postDocument, putDocument, getDocument, } from './handlers/documents';
import { listApiTags, listTags } from './handlers/tags';
import { listApiAssets } from './handlers/assets';
import { promisify } from './promisify';
var database;
/**
 * Starts a Mirage Server mocking all the ApiHub APIs. This server runs in the browser and intercepts
 * all requests made to the /api routes
 * @param {options} Options The options.
 * @param {options.timing} timing The delay before responding
 */
export var startApiHubMockedServer = function (_a) {
    if (_a === void 0) { _a = { data: defaultData, timing: 500 }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var server;
        var data = _a.data, options = __rest(_a, ["data"]);
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getDatabase(data)];
                case 1:
                    database = _b.sent();
                    server = new Server({
                        models: {
                            userContexts: Model.extend(),
                            apis: Model.extend(),
                            applications: Model.extend(),
                            documents: Model.extend(),
                        },
                        seeds: function (server) {
                            server.db.loadData(data);
                        },
                        routes: function () {
                            this.urlPrefix = 'https://apim.dev.ca.com';
                            this.get('/admin/passwordResetTokenValidate', passwordResetTokenValidate(database), options);
                            this.post('/admin/UpdateMyPassword', updateMyPassword(database), options);
                            this.get('/admin/Portal.svc/ResetMyPassword()', resetPassword(database), options);
                            this.get('/admin/logout', logout(database), options);
                            this.post('api/apim/authenticate/login', login(database), options);
                            this.get('api/admin/Portal.svc/UserNameUnique()', checkUserNameIsUnique(database), options);
                            this.get('api/admin/accountSetup', getAccountSetup(database), options);
                            this.put('/admin/accountSetup', putAccountSetup(database), options);
                            this.get('api/apim/authenticate/getPublicKey', getPublicKey(database), options);
                            this.get('api/apim/userContexts', getUserContexts(database), options);
                            this.get('api/apim/api-management/1.0/apis', listApis(database), options);
                            this.get('api/apim/api-management/1.0/applications', listApplications(database), options);
                            this.get('api/apim/document-service/0.1/:type/:typeUuid/docs', listDocuments(database), options);
                            this.post('api/apim/document-service/0.1/:type/:typeUuid/docs', postDocument(database), options);
                            this.put('api/apim/document-service/0.1/:type/:typeUuid/docs/:navtitle', putDocument(database), options);
                            this.get('api/apim/api-management/1.0/apis/:id', getApi(database), options);
                            this.get('api/apim/document-service/0.1/:type/:typeUuid/docs/tree', getDocumentsTree(database), options);
                            this.get('api/apim/document-service/0.1/:type/:typeUuid/docs/:navtitle', getDocument(database), options);
                            this.get('api/apim/api-management/1.0/apis/:id/tags', listApiTags(database), options);
                            this.get('api/apim/api-management/1.0/apis/:id/assets', listApiAssets(database), options);
                            this.get('api/apim/tags', listTags(database), options);
                            this.get('admin/api-management/internal/permissions/apis/:id/permitted', listApiPermissions(database), options);
                            // This is the only way I found to make the SpecContent route work.
                            // Its url looks like api/apim/2.0/Apis(':id')/SpecContent.
                            // It seems either the parenthesises or the quotes make the route parameter
                            // parsing fail.
                            this.get('api/apim/2.0/*path', getApiSpecContent(database), options);
                        },
                    });
                    return [2 /*return*/];
            }
        });
    });
};
function getDatabase(initialData) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var indexedDb = new minimongo.IndexedDb({ namespace: 'layer7' }, function () { return resolve(indexedDb); }, reject);
                    })];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, initDatabase(db, initialData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, db];
            }
        });
    });
}
function initDatabase(db, initialData) {
    if (initialData === void 0) { initialData = defaultData; }
    return __awaiter(this, void 0, void 0, function () {
        var hasData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        promisify(db.addCollection.bind(db), 'apis'),
                        promisify(db.addCollection.bind(db), 'applications'),
                        promisify(db.addCollection.bind(db), 'userContexts'),
                        promisify(db.addCollection.bind(db), 'documents'),
                        promisify(db.addCollection.bind(db), 'specs'),
                        promisify(db.addCollection.bind(db), 'assets'),
                        promisify(db.addCollection.bind(db), 'tags'),
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, promisify(db.apis.find().fetch)];
                case 2:
                    hasData = (_a.sent()).length > 0;
                    if (!!hasData) return [3 /*break*/, 9];
                    return [4 /*yield*/, promisify(db.tags.upsert.bind(db.tags), initialData.tags)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, promisify(db.apis.upsert.bind(db.apis), initialData.apis)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, promisify(db.applications.upsert.bind(db.applications), initialData.applications)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, promisify(db.userContexts.upsert.bind(db.userContexts), initialData.userContexts)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, promisify(db.documents.upsert.bind(db.documents), initialData.documents)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, promisify(db.assets.upsert.bind(db.assets), initialData.assets)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
window.Layer7Mock = {
    clearDatabase: function () {
        database.removeCollection('apis');
        database.removeCollection('applications');
        database.removeCollection('userContexts');
        database.removeCollection('documents');
        database.removeCollection('specs');
        database.removeCollection('assets');
        database.removeCollection('tags');
    },
    initDatabase: function (initialData) {
        initDatabase(database, initialData);
    },
};
