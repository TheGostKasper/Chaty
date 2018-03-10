const hostUrl = 'http://localhost:56395';
const apiUrl = `${hostUrl}/api`
module.exports = {
    helpers: {
        scrollToBottom: (className) => {
            document.querySelector(className).scrollTo(0, document.querySelector(className).scrollHeight);
        },
        emptyContent: (name) => {
            document.getElementById(name).value=''
        },
        highlightDiv: (_index, className) => {
            const slcs = document.querySelectorAll(className);
            for (let index = 0; index < slcs.length; index++) {
                const element = slcs[index];
                if (_index === index) element.style.background = "#f1f0f0";
                else element.style.removeProperty('background');
            }

        },
        hostUrl: () => hostUrl,
        apiUrl: () => apiUrl
    }
}