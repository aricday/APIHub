"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var faker = require('faker');
var merge = require('lodash/merge');
function generateData() {
    var organizations = generateOrganisations();
    var tags = generateTags();
    var userContexts = generateUserContexts({ organizations: organizations });
    var apis = generateApis({ tags: tags });
    var applications = generateApplications({ apis: apis });
    var documents = generateDocumentationForApis({ apis: apis });
    var assets = generateAssetsForApis({ apis: apis });
    return {
        userContexts: userContexts,
        apis: apis,
        applications: applications,
        tags: tags,
        documents: documents,
        assets: assets,
    };
}
function generateOrganisations() {
    return Array.from(Array(5).keys()).map(function () { return ({
        uuid: faker.random.uuid(),
        name: faker.company.companyName(),
    }); });
}
function generateUserContexts(_a) {
    var organizations = _a.organizations;
    var portalAdmin = generateUserContext({
        organizations: organizations,
        userContexts: [
            {
                userDetails: {
                    username: 'portalAdmin',
                    portalAdmin: true,
                    orgPublisher: true,
                    apiOwner: true,
                },
            },
        ],
    });
    var orgPublisher = generateUserContext({
        organizations: organizations,
        userContexts: [
            {
                userDetails: {
                    username: 'orgPublisher',
                    orgPublisher: true,
                    apiOwner: true,
                },
            },
        ],
    });
    var apiOwner = generateUserContext({
        organizations: organizations,
        userContexts: [
            {
                userDetails: {
                    username: 'apiOwner',
                    apiOwner: true,
                },
            },
        ],
    });
    var user = generateUserContext({
        organizations: organizations,
        userContexts: [
            {
                userDetails: {
                    username: 'user',
                },
            },
        ],
    });
    return [portalAdmin, orgPublisher, apiOwner, user];
}
function generateUserContext(_a) {
    var organizations = _a.organizations, data = __rest(_a, ["organizations"]);
    var nbOrganisations = faker.random.number({ min: 1, max: 5 });
    var accessibleOrgs = faker.random.arrayElements(organizations, nbOrganisations);
    var uuid = faker.random.uuid();
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    return merge({
        uuid: uuid,
        userContexts: [
            {
                userDetails: {
                    uuid: uuid,
                    username: faker.internet.userName(firstName, lastName),
                    lastName: lastName,
                    firstName: firstName,
                    email: faker.internet.email(firstName, lastName),
                    portalAdmin: false,
                    apiOwner: false,
                    orgPublisher: false,
                },
                activeOrgUuid: accessibleOrgs[0].uuid,
                accessibleOrgs: accessibleOrgs.reduce(function (acc, org) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[org.name] = org.uuid, _a)));
                }, {}),
            },
        ],
    }, data);
}
function generateApis(data) {
    return Array.from(Array(25).keys()).map(function () { return generateApi(data); });
}
function generateApi(_a) {
    var tags = _a.tags, data = __rest(_a, ["tags"]);
    var createTs = faker.date.past();
    var uuid = faker.random.uuid();
    return merge({
        id: uuid,
        uuid: uuid,
        name: faker.fake('{{hacker.abbreviation}} {{name.jobDescriptor}} {{name.jobArea}}'),
        description: faker.company.catchPhrase(),
        createTs: createTs.valueOf(),
        modifyTs: faker.date.between(createTs, Date.now()),
        version: faker.system.semver(),
        ssgServiceType: faker.random.arrayElement(['SOAP', 'REST']),
        portalStatus: faker.random.arrayElement([
            'ENABLED',
            'DISABLED',
            'DEPRECATED',
            'UNPUBLISHED',
        ]),
        accessStatus: faker.random.arrayElement(['PUBLIC', 'PRIVATE']),
        tags: faker.random
            .arrayElements(tags, faker.random.number({ min: 1, max: 3 }))
            .map(function (_a) {
            var name = _a.name;
            return name;
        }),
    }, data);
}
function generateApplications(_a) {
    var apis = _a.apis;
    return Array.from(Array(25).keys()).map(function () {
        return generateApplication({ apis: apis });
    });
}
function generateApplication(_a) {
    var apis = _a.apis, data = __rest(_a, ["apis"]);
    var nbApis = faker.random.number({ min: 1, max: 5 });
    var uuid = faker.random.uuid();
    // This field won't be returned but will be used by the mock server
    var _accessibleApis = faker.random
        .arrayElements(apis, nbApis)
        .map(function (_a) {
        var uuid = _a.uuid;
        return uuid;
    });
    apis.filter(function (_a) {
        var uuid = _a.uuid;
        return _accessibleApis.includes(uuid);
    }).forEach(function (api) { return (api.applicationUsage = (api.applicationUsage || 0) + 1); });
    return merge({
        id: uuid,
        uuid: uuid,
        name: faker.fake('{{hacker.abbreviation}} {{name.jobDescriptor}} {{name.jobArea}}'),
        status: faker.random.arrayElement([
            'ENABLED',
            'DISABLED',
            'DEPRECATED',
            'UNPUBLISHED',
        ]),
        _accessibleApis: _accessibleApis,
    }, data);
}
function generateTags() {
    return [
        { uuid: faker.random.uuid(), name: 'Accounts' },
        { uuid: faker.random.uuid(), name: 'Security' },
        { uuid: faker.random.uuid(), name: 'Plans' },
        { uuid: faker.random.uuid(), name: 'Organizations' },
    ];
}
function generateDocumentationForApis(_a) {
    var apis = _a.apis, data = __rest(_a, ["apis"]);
    var documents = apis.reduce(function (acc, api) {
        acc.push.apply(acc, generateDocumentationForApi({ api: api }));
        return acc;
    }, []);
    return documents;
}
function generateDocumentationForApi(_a) {
    var api = _a.api, data = __rest(_a, ["api"]);
    var nbRootDocuments = faker.random.number({ min: 0, max: 6 });
    var documents = [];
    for (var index = 0; index < nbRootDocuments; index++) {
        documents.push.apply(documents, generateDocumentsForApi({ api: api, ordinal: index, maxChild: 6 }));
    }
    return documents;
}
function generateDocumentsForApi(_a) {
    var api = _a.api, maxChild = _a.maxChild, data = __rest(_a, ["api", "maxChild"]);
    var title = faker.company.catchPhrase();
    var document = __assign({ uuid: faker.random.uuid(), type: 'api', typeUuid: api.uuid, locale: 'en-US', status: 'PUBLISHED', title: title, navtitle: faker.helpers.slugify(title).toLowerCase(), markdown: faker.lorem.text(faker.random.number({ min: 1, max: 10 })), ordinal: 0 }, data);
    var documents = [document];
    var nbChildDocuments = faker.random.number({ min: 0, max: maxChild });
    for (var index = 0; index < nbChildDocuments; index++) {
        documents.push.apply(documents, generateDocumentsForApi({
            api: api,
            maxChild: maxChild - 2,
            parentUuid: document.uuid,
        }));
    }
    return documents;
}
function generateAssetsForApis(_a) {
    var apis = _a.apis, data = __rest(_a, ["apis"]);
    var assets = apis.reduce(function (acc, api) {
        acc.push.apply(acc, generateAssetsForApi({ api: api }));
        return acc;
    }, []);
    return assets;
}
function generateAssetsForApi(_a) {
    var api = _a.api;
    var nbAssets = faker.random.number({ min: 1, max: 5 });
    var assets = [];
    for (var index = 0; index < nbAssets; index++) {
        var uuid = faker.random.uuid();
        var name_1 = faker.system.fileName();
        var fileName = name_1.substr(0, name_1.indexOf('.')) + ".json";
        assets.push({
            uuid: uuid,
            type: 'JSON',
            name: fileName,
            _apiUuid: api.uuid,
            links: [
                {
                    rel: 'file',
                    href: "/api-management/1.0/apis/" + api.uuid + "/assets/" + uuid + "/file",
                },
            ],
        });
    }
    return assets;
}
module.exports = {
    generateData: generateData,
    generateOrganisations: generateOrganisations,
    generateUserContexts: generateUserContexts,
    generateUserContext: generateUserContext,
    generateApis: generateApis,
    generateApplications: generateApplications,
};
