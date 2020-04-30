import { Model, Server } from 'miragejs';
import minimongo from 'minimongo';
import defaultData from './defaultData.json';
import {
    login,
    getPublicKey,
    resetPassword,
    checkUserNameIsUnique,
    passwordResetTokenValidate,
    updateMyPassword,
    logout,
    getAccountSetup,
    putAccountSetup,
    getUserContexts,
} from './handlers/authentication';
import {
    listApis,
    getApi,
    listApiPermissions,
    getApiSpecContent,
} from './handlers/apis';
import { listApplications } from './handlers/applications';
import {
    listDocuments,
    getDocumentsTree,
    postDocument,
    putDocument,
    getDocument,
} from './handlers/documents';
import { listApiTags, listTags } from './handlers/tags';
import { listApiAssets } from './handlers/assets';
import { promisify } from './promisify';

let database;

/**
 * Starts a Mirage Server mocking all the ApiHub APIs. This server runs in the browser and intercepts
 * all requests made to the /api routes
 * @param {options} Options The options.
 * @param {options.timing} timing The delay before responding
 */
export const startApiHubMockedServer = async (
    { data, ...options } = { data: defaultData, timing: 500 }
) => {
    database = await getDatabase(data);

    const server = new Server({
        models: {
            userContexts: Model.extend(),
            apis: Model.extend(),
            applications: Model.extend(),
            documents: Model.extend(),
        },
        seeds(server) {
            server.db.loadData(data);
        },
        routes() {
            this.urlPrefix = 'https://apim.dev.ca.com';

            this.get(
                '/admin/passwordResetTokenValidate',
                passwordResetTokenValidate(database),
                options
            );

            this.post(
                '/admin/UpdateMyPassword',
                updateMyPassword(database),
                options
            );

            this.get(
                '/admin/Portal.svc/ResetMyPassword()',
                resetPassword(database),
                options
            );

            this.get('/admin/logout', logout(database), options);

            this.post('api/apim/authenticate/login', login(database), options);

            this.get(
                'api/admin/Portal.svc/UserNameUnique()',
                checkUserNameIsUnique(database),
                options
            );

            this.get(
                'api/admin/accountSetup',
                getAccountSetup(database),
                options
            );

            this.put('/admin/accountSetup', putAccountSetup(database), options);

            this.get(
                'api/apim/authenticate/getPublicKey',
                getPublicKey(database),
                options
            );

            this.get(
                'api/apim/userContexts',
                getUserContexts(database),
                options
            );

            this.get(
                'api/apim/api-management/1.0/apis',
                listApis(database),
                options
            );

            this.get(
                'api/apim/api-management/1.0/applications',
                listApplications(database),
                options
            );

            this.get(
                'api/apim/document-service/0.1/:type/:typeUuid/docs',
                listDocuments(database),
                options
            );

            this.post(
                'api/apim/document-service/0.1/:type/:typeUuid/docs',
                postDocument(database),
                options
            );

            this.put(
                'api/apim/document-service/0.1/:type/:typeUuid/docs/:navtitle',
                putDocument(database),
                options
            );

            this.get(
                'api/apim/api-management/1.0/apis/:id',
                getApi(database),
                options
            );

            this.get(
                'api/apim/document-service/0.1/:type/:typeUuid/docs/tree',
                getDocumentsTree(database),
                options
            );

            this.get(
                'api/apim/document-service/0.1/:type/:typeUuid/docs/:navtitle',
                getDocument(database),
                options
            );

            this.get(
                'api/apim/api-management/1.0/apis/:id/tags',
                listApiTags(database),
                options
            );

            this.get(
                'api/apim/api-management/1.0/apis/:id/assets',
                listApiAssets(database),
                options
            );

            this.get('api/apim/tags', listTags(database), options);

            this.get(
                'admin/api-management/internal/permissions/apis/:id/permitted',
                listApiPermissions(database),
                options
            );

            // This is the only way I found to make the SpecContent route work.
            // Its url looks like api/apim/2.0/Apis(':id')/SpecContent.
            // It seems either the parenthesises or the quotes make the route parameter
            // parsing fail.
            this.get(
                'api/apim/2.0/*path',
                getApiSpecContent(database),
                options
            );
        },
    });
};

async function getDatabase(initialData) {
    const db = await new Promise((resolve, reject) => {
        const indexedDb = new minimongo.IndexedDb(
            { namespace: 'layer7' },
            () => resolve(indexedDb),
            reject
        );
    });

    await initDatabase(db, initialData);

    return db;
}

async function initDatabase(db, initialData = defaultData) {
    await Promise.all([
        promisify(db.addCollection.bind(db), 'apis'),
        promisify(db.addCollection.bind(db), 'applications'),
        promisify(db.addCollection.bind(db), 'userContexts'),
        promisify(db.addCollection.bind(db), 'documents'),
        promisify(db.addCollection.bind(db), 'specs'),
        promisify(db.addCollection.bind(db), 'assets'),
        promisify(db.addCollection.bind(db), 'tags'),
    ]);

    const hasData = (await promisify(db.apis.find().fetch)).length > 0;

    if (!hasData) {
        await promisify(db.tags.upsert.bind(db.tags), initialData.tags);
        await promisify(db.apis.upsert.bind(db.apis), initialData.apis);

        await promisify(
            db.applications.upsert.bind(db.applications),
            initialData.applications
        );

        await promisify(
            db.userContexts.upsert.bind(db.userContexts),
            initialData.userContexts
        );
        await promisify(
            db.documents.upsert.bind(db.documents),
            initialData.documents
        );
        await promisify(db.assets.upsert.bind(db.assets), initialData.assets);
    }
}

window.Layer7Mock = {
    clearDatabase: () => {
        database.removeCollection('apis');
        database.removeCollection('applications');
        database.removeCollection('userContexts');
        database.removeCollection('documents');
        database.removeCollection('specs');
        database.removeCollection('assets');
        database.removeCollection('tags');
    },

    initDatabase: initialData => {
        initDatabase(database, initialData);
    },
};
