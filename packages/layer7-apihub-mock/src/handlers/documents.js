import faker from 'faker';
import { promisify } from '../promisify';

export function listDocuments(database) {
    return async (schema, request) => {
        const { type, typeUuid } = request.params;
        const { locale } = request.queryParams;

        const documents = await promisify(
            database.documents.find({
                type,
                typeUuid,
                locale,
            }).fetch
        );

        return documents;
    };
}

export function postDocument(database) {
    return async (schema, request) => {
        const document = JSON.parse(request.requestBody);

        await promisify(database.documents.upsert.bind(database.documents), {
            ...document,
            uuid: faker.random.uuid(),
            typeUuid: request.params.typeUuid,
        });

        return request.requestBody;
    };
}

export function putDocument(database) {
    return async (schema, request) => {
        const document = JSON.parse(request.requestBody);

        await promisify(database.documents.upsert.bind(database.documents), {
            ...document,
            typeUuid: request.params.typeUuid,
        });

        return request.requestBody;
    };
}

export function getDocumentsTree(database) {
    return async (schema, request) => {
        const { type, typeUuid } = request.params;
        const { locale } = request.queryParams;

        const documents = await promisify(
            database.documents.find({
                type,
                typeUuid,
                locale,
            }).fetch
        );

        return documents.map(({ markdown, ...doc }) => doc);
    };
}

export function getDocument(database) {
    return async (schema, request) => {
        const { type, typeUuid, navtitle } = request.params;
        const { locale } = request.queryParams;

        const document = await promisify(
            database.documents.findOne.bind(database.documents),
            {
                type,
                typeUuid,
                navtitle,
                locale,
            }
        );

        return document;
    };
}
