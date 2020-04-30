"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
/**
 * Detect if the user is a publisher from the user context.
 *
 * @param {object} userContext The user context
 */
exports.isPublisher = userContext => {
    const portalAdmin = !!get_1.default(userContext, 'userDetails.portalAdmin', null);
    const apiOwner = !!get_1.default(userContext, 'userDetails.apiOwner', null);
    const orgPublisher = !!get_1.default(userContext, 'userDetails.orgPublisher', null);
    return portalAdmin || apiOwner || orgPublisher;
};
//# sourceMappingURL=isPublisher.js.map