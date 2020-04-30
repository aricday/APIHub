import React from 'react';
import { DataProviderContext, renderWithRedux } from 'ra-core';

import { HomePageContent } from './HomePageContent';
import { CurrentUserId } from '../dataProvider/userContexts';
import { fireEvent, wait } from '@testing-library/react';

describe('HomePageContent', () => {
    const initialState = {
        admin: {
            resources: {
                documents: { data: {} },
                userContexts: { data: {} },
            },
        },
    };

    test('should render the empty state if the document does not exist', async () => {
        const dataProvider = {
            getList: jest.fn().mockResolvedValue({
                data: [],
                total: 0,
            }),
            getOne: jest.fn().mockResolvedValue({
                data: {
                    id: CurrentUserId,
                    userDetails: {
                        portalAdmin: true,
                    },
                },
            }),
        };

        const { findByText } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <HomePageContent />
            </DataProviderContext.Provider>,
            initialState
        );

        await findByText('apihub.homepage.placeholder_empty_content');
    });

    test('should not render the create button when the document does not exist and the user is not a portal admin', async () => {
        const dataProvider = {
            getList: jest.fn().mockResolvedValue({
                data: [],
                total: 0,
            }),
            getOne: jest.fn().mockResolvedValue({
                data: {
                    id: CurrentUserId,
                    userDetails: {
                        portalAdmin: false,
                    },
                },
            }),
        };

        const { findByText, queryByText } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <HomePageContent />
            </DataProviderContext.Provider>,
            initialState
        );

        await findByText('apihub.homepage.placeholder_empty_content');
        expect(queryByText('ra.action.create')).toBeNull();
    });

    test('should not render the edit button when the document exist and the user is not a portal admin', async () => {
        const dataProvider = {
            getList: jest.fn().mockResolvedValue({
                data: [
                    {
                        navtitle: 'home1',
                        markdown: 'some markdown',
                    },
                ],
                total: 0,
            }),
            getOne: jest.fn().mockResolvedValue({
                data: {
                    id: CurrentUserId,
                    userDetails: {
                        portalAdmin: false,
                    },
                },
            }),
        };

        const { findByText, queryByText } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <HomePageContent navtitle="home1" />
            </DataProviderContext.Provider>,
            initialState
        );

        await findByText('some markdown');
        expect(queryByText('ra.action.edit')).toBeNull();
    });

    test('should allow to create a new document when the document does not exist and the user is a portal admin', async () => {
        jest.setTimeout(10000);
        const documents = [];
        const dataProvider = {
            getList: jest.fn().mockResolvedValue({
                data: documents,
                total: 0,
            }),
            getOne: jest.fn().mockResolvedValue({
                data: {
                    id: CurrentUserId,
                    userDetails: {
                        portalAdmin: true,
                    },
                },
            }),
            create: jest.fn((resource, { data }) => {
                documents.push(data);
                return Promise.resolve({ data });
            }),
        };

        const {
            findByText,
            findAllByText,
            getByText,
            getByLabelText,
            findByRole,
            queryByRole,
        } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <HomePageContent />
            </DataProviderContext.Provider>,
            initialState
        );

        await findByText('apihub.homepage.placeholder_empty_content');
        fireEvent.click(getByLabelText('ra.action.create'));

        const dialog = await findByRole('dialog');
        fireEvent.change(
            getByLabelText('resources.documents.fields.markdown', {
                container: dialog,
            }),
            { target: { value: 'some markdown' } }
        );

        expect(
            (await findAllByText('some markdown', { container: dialog })).length
        ).toBeGreaterThan(0);

        fireEvent.click(
            getByText('resources.documents.actions.save', { container: dialog })
        );
        expect(dataProvider.create).toHaveBeenCalled();

        await wait(() => {
            expect(queryByRole('dialog')).toBeNull();
        });

        expect(await findByText('some markdown'));
    });

    test('should allow to update an existing document if the user is a portal admin', async () => {
        jest.setTimeout(10000);
        const documents = [
            {
                navtitle: 'home1',
                markdown: 'some markdown',
            },
        ];

        const dataProvider = {
            getList: jest.fn().mockResolvedValue({
                data: documents,
                total: 0,
            }),
            getOne: jest.fn().mockResolvedValue({
                data: {
                    id: CurrentUserId,
                    userDetails: {
                        portalAdmin: true,
                    },
                },
            }),
            create: jest.fn((resource, { data }) => {
                documents.push(data);
                return Promise.resolve({ data });
            }),
            update: jest.fn((resource, { data }) => {
                documents[0] = data;
            }),
        };

        const {
            findByText,
            findAllByText,
            getByText,
            getByLabelText,
            findByRole,
            queryByRole,
        } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <HomePageContent />
            </DataProviderContext.Provider>,
            initialState
        );

        await findByText('some markdown');
        fireEvent.click(getByLabelText('ra.action.edit'));

        const dialog = await findByRole('dialog');
        fireEvent.change(
            getByLabelText('resources.documents.fields.markdown', {
                container: dialog,
            }),
            { target: { value: 'some even better markdown' } }
        );

        expect(
            (
                await findAllByText('some even better markdown', {
                    container: dialog,
                })
            ).length
        ).toBeGreaterThan(0);

        fireEvent.click(
            getByText('resources.documents.actions.save', { container: dialog })
        );

        await wait(() => {
            expect(queryByRole('dialog')).toBeNull();
        });

        expect(await findByText('some even better markdown'));
    });
});
