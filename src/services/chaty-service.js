const cookies_services = require('./cookies-service').cookies_services;
const services = require('./encrypt-service').encode;
const common = require('./common-service').helpers;


const urlApi = common.apiUrl();
const token = cookies_services.getCookie("token");
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${(token) ? token.replace('"', '').replace('"', '') : ""}`
};
function callFetch(endPoint, method, body, optHeaders) {
    if (optHeaders && optHeaders.length > 0) {
        optHeaders.forEach(element => {
            headers.append(element)
        });
    }
    var bodyObj = {
        method: method, headers: headers
    }
    if (body) {
        bodyObj = {
            method: method, headers: headers, body: JSON.stringify(body)
        }
    }
    return fetch(`${urlApi}/${endPoint}`, bodyObj).then((response) => {
        return response.json();
    }).catch((err) => {
        return err;
    });
}
module.exports = {
    services: {
        logIn: (user) => {
            user.password = services.b64EncodeUnicode(user.password);
            return callFetch('users/Login', 'Post', user);
        },
        signUp: (user) => {
            user.password = services.b64EncodeUnicode(user.password);
            return callFetch('users', 'Post', user);
        },
        getUsers: () => {
            return callFetch('users', 'Get');
        },
        getFriends: () => {
            return callFetch('users/friends', 'POST');
        },
        getChatters: (id) => {
            return callFetch(`messages/Init?userId=${id}`, 'Get');
        },
        getMessages: (request) => {
            return callFetch('messages/ListMessages', 'Post', request);
        },
        uploadAvatar: (user) => {
            user.avatar = user.avatar.split(',')[1];
            return callFetch('users/uploadAvatar', 'POST', user);
        },
        updateUser: (id, user) => {
            user.password = services.b64EncodeUnicode(user.password);
            return callFetch(`users/${id}`, 'PUT', user);
        },
        searchUsers: (page, search) => {
            return callFetch('users/search', 'POST', { page: page, search: search, pageSize: 20 });
        },
        getNotification: (userId) => {
            return callFetch(`messages/notification?userId=${userId}`, 'Get');
        }
    }

};
