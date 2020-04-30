"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = require("./apis");
const applications_1 = require("./applications");
const assets_1 = require("./assets");
const specs_1 = require("./specs");
const tags_1 = require("./tags");
const documents_1 = require("./documents");
const userContexts_1 = require("./userContexts");
exports.dataProvider = (baseUrl, tenantName) => {
    const adminUrl = `${baseUrl}/admin`;
    const apiUrl = `${baseUrl}/api/${tenantName}`;
    const resourcesMap = {
        apis: apis_1.apisDataProvider(apiUrl, adminUrl),
        applications: applications_1.applicationsDataProvider(apiUrl),
        assets: assets_1.assetsDataProvider(apiUrl),
        tags: tags_1.tagsDataProvider(apiUrl),
        specs: specs_1.specsDataProvider(apiUrl),
        documents: documents_1.documentsDataProvider(apiUrl),
        userContexts: userContexts_1.userContextsDataProvider(apiUrl),
    };
    const proxy = new Proxy(fakeDataProvider, {
        get: (target, name) => {
            return (resource, params) => {
                let resourceDataProvider = resourcesMap[resource];
                if (!resourceDataProvider) {
                    throw new Error(`Invalid resource "${resource}"`);
                }
                if (!resourceDataProvider[name]) {
                    throw new Error(`Invalid action "${name}" for resource "${resource}"`);
                }
                return resourceDataProvider[name](params);
            };
        },
    });
    return proxy;
};
// Only used to configure the proxy
const fakeDataProvider = {
    create: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
    deleteMany: () => Promise.resolve(null),
    getList: () => Promise.resolve(null),
    getMany: () => Promise.resolve(null),
    getManyReference: () => Promise.resolve(null),
    getOne: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    updateMany: () => Promise.resolve(null),
};
//# sourceMappingURL=index.js.map