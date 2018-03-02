function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
function setCookies(cnames, exdays) {
    if (cnames.length > 0)
        cnames.forEach(element => {
            setCookie(element.name, element.value, exdays);
        });
}
function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function deleteCookies(cnames) {
    if (cnames.length > 0)
        cnames.forEach(element => {
            deleteCookie(element);
        });
}
module.exports = {
    cookies_services: {
        setCookie: setCookie,
        getCookie: getCookie,
        setCookies: setCookies,
        deleteCookie:deleteCookie,
        deleteCookies:deleteCookies
    }

};
