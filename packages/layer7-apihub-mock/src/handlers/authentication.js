import {
    deleteCurrentUser,
    getCurrentUser,
    setCurrentUser,
} from './currentUser';
import { promisify } from '../promisify';

export function login(database) {
    return async (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        // Minimongo does not support mongo array search so we fall back
        // to retrieving all users (we don't have many) and filter ourselves
        const users = await promisify(database.userContexts.find().fetch);
        const user = users.find(
            u => u.userContexts[0].userDetails.username === username
        );

        if (!user || password !== 'Password@1') {
            return new Response(
                401,
                {},
                {
                    respCode: '401',
                    respMsg: `Authentication failed for user '${username}'`,
                    provider: '',
                    referrer: '',
                }
            );
        }
        setCurrentUser(user);

        return {
            respCode: '200',
            respMsg: 'Successfully authenticated user',
            provider: '',
            referrer: '',
            dashboardPath: '',
            gateaugauge: 'mocked-token',
        };
    };
}

export function getPublicKey(database) {
    return (schema, request) => {
        return {
            respCode: 200,
            respMsg: 'Successfully fetched public key',
            publicKey:
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgVL6G4zaK+ngqrBheIqP1HcqZIdT8cyHJhvZ9rqOSRdemmvMTFsBoJScPAQQl/jlb7VVVvkGdkvSompszpHaIMQxWG6QuBF23v72nu5NmpYDBsyHZHgIROzqdzqycfKhvWrdDFfq17eZmarsNzvc4KVF3CVv+aM4aXmLPXCIMhrq6M+MYcwMYMS5G6JEYXQtvpw5GQHDm6nfTHNds3wBzooakaOMIldae56jRnX+ILeb+yPWmjsPPwbaOjU2cbygNKMHBfnLEFRz05J2XcGh/DGm4x0s12jnPNiH8hkHd8U8bviwvLlreNBM1XCThL0V07HCETzUPQOhpLtplUh7RwIDAQAB',
        };
    };
}

export function resetPassword(database) {
    return (schema, request) => {
        return {
            status: 200,
        };
    };
}

export function checkUserNameIsUnique(database) {
    return async (schema, request) => {
        const username = request.queryParams.Name;

        // Minimongo does not support mongo array search so we fall back
        // to retrieving all users (we don't have many) and filter ourselves
        const users = await promisify(database.userContexts.find().fetch);
        const usersWithSameUsernameExist = users.some(
            u => u.userContexts[0].userDetails.username === username
        );

        if (usersWithSameUsernameExist) {
            return new Response(401, {}, { errors: ['should be unique'] });
        }

        return {
            status: 200,
        };
    };
}

export function passwordResetTokenValidate(database) {
    return (schema, request) => {
        return {
            status: 200,
        };
    };
}

export function updateMyPassword(database) {
    return (schema, request) => {
        return {
            status: 200,
        };
    };
}

export function logout(database) {
    return (schema, request) => {
        deleteCurrentUser();

        return {
            status: 200,
        };
    };
}

export function getAccountSetup(database) {
    return (schema, request) => {
        const token = request.queryParams.token;

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
    return (schema, request) => {
        const token = request.queryParams.token;

        if (token === 'IamLordVoldemort') {
            return {
                status: 200,
            };
        }

        return new Response(401, {}, { errors: ['token not valid'] });
    };
}

export function getUserContexts(database) {
    return (schema, request) => {
        return getCurrentUser();
    };
}
