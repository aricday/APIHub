"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const jsencrypt_1 = __importDefault(require("jsencrypt"));
const ApiHubContext_1 = require("../ApiHubContext");
exports.defaultEncrypt = (publicKey, data) => {
    const encrypter = new jsencrypt_1.default();
    encrypter.setPublicKey(publicKey);
    return Promise.resolve(encrypter.encrypt(data));
};
/**
 * A hook which will fetch the API public key and provide a function to encrypt data.
 * @param {*} encrypt The function to encrypt data.
 * It receives the public key as its first parameter and the dat to encrypt next.
 * It returns a promise resolving to the encrypted data.
 * @returns A tupple with the public key first and the encrypt function next.
 * @example
 *
 * const [publicKey, encrypt] = usePasswordEncryption();
 */
exports.usePasswordEncryption = (encrypt = exports.defaultEncrypt) => {
    const { urlWithTenant } = ApiHubContext_1.useApiHub();
    const [publicKey, setPublicKey] = react_1.useState();
    react_1.useEffect(() => {
        fetchPublicKey(urlWithTenant)
            .then(setPublicKey)
            .catch(console.error);
    }, [urlWithTenant]);
    const encryptData = async (data) => {
        if (!publicKey) {
            return data;
        }
        const encryptedData = await encrypt(publicKey, data);
        return encryptedData;
    };
    return [publicKey, encryptData];
};
const fetchPublicKey = async (apiBaseUrl) => {
    const response = await fetch(`${apiBaseUrl}/authenticate/getPublicKey`);
    if (response.status < 200 || response.status >= 300) {
        return undefined;
    }
    const data = await response.json();
    return data.publicKey;
};
//# sourceMappingURL=usePasswordEncryption.js.map