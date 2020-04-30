"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrentUserKey = '@mock/currentUser';
function setCurrentUser(user) {
    return localStorage.setItem(CurrentUserKey, JSON.stringify(user));
}
exports.setCurrentUser = setCurrentUser;
function deleteCurrentUser() {
    localStorage.removeItem(CurrentUserKey);
}
exports.deleteCurrentUser = deleteCurrentUser;
function getCurrentUser() {
    var str = localStorage.getItem(CurrentUserKey);
    if (str) {
        return JSON.parse(str);
    }
    return null;
}
exports.getCurrentUser = getCurrentUser;
