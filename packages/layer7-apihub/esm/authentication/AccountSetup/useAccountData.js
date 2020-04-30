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
import { useEffect, useState } from 'react';
import { useApiHub } from '../../ApiHubContext';
import { extractTokenFromUrl } from '../extractTokenFromUrl';
import { usePasswordEncryption } from '../usePasswordEncryption';
export const fetchAccountData = async (url, token) => {
    const response = await fetch(`${url}/admin/accountSetup?token=${token}`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }
    return await response.json();
};
export const submitAccountData = async (url, token, data) => {
    const response = await fetch(`${url}/admin/accountSetup?token=${token}`, {
        method: 'put',
        body: Object.assign({ token }, data),
    });
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }
    return await response.json();
};
export const checkUsernameUnicity = async (url, username) => {
    const response = await fetch(`${url}/admin/Portal.svc/UserNameUnique()?Name='${username}'`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }
    return await response.json();
};
/**
 * This hook extracts the token from the url, fetch the account data and provides
 * a function to set up the account.
 *
 * It returns a tupple containing
 * - the current status of the form (prepare, fill, invalid_request and success)
 * - the account data to initialize the form
 * - a function to submit the new account data
 */
export const useAccountData = location => {
    const [state, setState] = useState('prepare');
    const [accountData, setAccountData] = useState(null);
    const { url } = useApiHub();
    const token = extractTokenFromUrl(location.hash);
    const [publicKey, encrypt] = usePasswordEncryption();
    useEffect(() => {
        if (state === 'prepare') {
            fetchAccountData(url, token)
                .then((_a) => {
                var { email } = _a, rest = __rest(_a, ["email"]);
                const isVerified = !!email;
                if (isVerified) {
                    setState('fill');
                    setAccountData(Object.assign({ email }, rest));
                    return;
                }
                throw Error('Cannot get account setup data');
            })
                .catch(() => {
                setAccountData(null);
                setState('invalid_request');
            });
        }
    }, [url, token, state, accountData]);
    const handleSubmitAccountData = data => {
        let finalData = data;
        if (publicKey) {
            finalData = Object.assign(Object.assign({}, data), { password: encrypt(data.password) });
        }
        return submitAccountData(url, token, finalData).then(() => {
            setState('success');
        });
    };
    return [state, accountData, handleSubmitAccountData];
};
//# sourceMappingURL=useAccountData.js.map