import { moveDocument } from './ChangeParentDocumentButton';

describe('ChangeParentDocumentButton', () => {
    describe('moveDocument', () => {
        test('should correctly move a document from a leaf to another leaf first child and update its new siblings', () => {
            const document = {
                id: 'document',
                parentUuid: 'another_root_uuid',
                ordinal: 1,
            };
            const allDocuments = [
                document,
                { id: 'a_root', uuid: 'a_root_uuid' },
                { id: 'another_root', uuid: 'another_root_uuid' },
                { id: 'a_child', parentUuid: 'a_root_uuid', ordinal: 0 },
                { id: 'another_child', parentUuid: 'a_root_uuid', ordinal: 1 },
                { id: 'a_child', parentUuid: 'another_root_uuid', ordinal: 0 },
                {
                    id: 'another_child',
                    parentUuid: 'another_root_uuid',
                    ordinal: 2,
                },
            ];
            expect(
                moveDocument({
                    document,
                    allDocuments,
                    newParentId: 'a_root',
                    ordinal: 0,
                })
            ).toEqual([
                { id: 'document', parentUuid: 'a_root_uuid', ordinal: 0 },
                { id: 'a_root', uuid: 'a_root_uuid' },
                { id: 'another_root', uuid: 'another_root_uuid' },
                { id: 'a_child', parentUuid: 'a_root_uuid', ordinal: 1 },
                { id: 'another_child', parentUuid: 'a_root_uuid', ordinal: 2 },
                { id: 'a_child', parentUuid: 'another_root_uuid', ordinal: 0 },
                {
                    id: 'another_child',
                    parentUuid: 'another_root_uuid',
                    ordinal: 1,
                },
            ]);
        });

        test('should correctly move a document from a leaf to another leaf child and update its new siblings', () => {
            const document = {
                id: 'document',
                parentUuid: 'another_root_uuid',
                ordinal: 1,
            };
            const allDocuments = [
                document,
                { id: 'a_root', uuid: 'a_root_uuid' },
                { id: 'another_root', uuid: 'another_root_uuid' },
                { id: 'a_child', parentUuid: 'a_root_uuid', ordinal: 0 },
                { id: 'another_child', parentUuid: 'a_root_uuid', ordinal: 1 },
                { id: 'a_child', parentUuid: 'another_root_uuid', ordinal: 0 },
                {
                    id: 'another_child',
                    parentUuid: 'another_root_uuid',
                    ordinal: 2,
                },
            ];
            expect(
                moveDocument({
                    document,
                    allDocuments,
                    newParentId: 'a_root',
                    ordinal: 1,
                })
            ).toEqual([
                { id: 'document', parentUuid: 'a_root_uuid', ordinal: 1 },
                { id: 'a_root', uuid: 'a_root_uuid' },
                { id: 'another_root', uuid: 'another_root_uuid' },
                { id: 'a_child', parentUuid: 'a_root_uuid', ordinal: 0 },
                { id: 'another_child', parentUuid: 'a_root_uuid', ordinal: 2 },
                { id: 'a_child', parentUuid: 'another_root_uuid', ordinal: 0 },
                {
                    id: 'another_child',
                    parentUuid: 'another_root_uuid',
                    ordinal: 1,
                },
            ]);
        });

        test('should correctly move a document from a leaf to another leaf last child and not update its new siblings', () => {
            const document = {
                id: 'document',
                parentUuid: 'another_root_uuid',
                ordinal: 1,
            };
            const allDocuments = [
                document,
                { id: 'a_root', uuid: 'a_root_uuid' },
                { id: 'another_root', uuid: 'another_root_uuid' },
                { id: 'a_child', parentUuid: 'a_root_uuid', ordinal: 0 },
                { id: 'another_child', parentUuid: 'a_root_uuid', ordinal: 1 },
                { id: 'a_child', parentUuid: 'another_root_uuid', ordinal: 0 },
                {
                    id: 'another_child',
                    parentUuid: 'another_root_uuid',
                    ordinal: 2,
                },
            ];
            expect(
                moveDocument({
                    document,
                    allDocuments,
                    newParentId: 'a_root',
                    ordinal: 2,
                })
            ).toEqual([
                { id: 'document', parentUuid: 'a_root_uuid', ordinal: 2 },
                { id: 'a_root', uuid: 'a_root_uuid' },
                { id: 'another_root', uuid: 'another_root_uuid' },
                { id: 'a_child', parentUuid: 'a_root_uuid', ordinal: 0 },
                { id: 'another_child', parentUuid: 'a_root_uuid', ordinal: 1 },
                { id: 'a_child', parentUuid: 'another_root_uuid', ordinal: 0 },
                {
                    id: 'another_child',
                    parentUuid: 'another_root_uuid',
                    ordinal: 1,
                },
            ]);
        });
    });
});
