module.exports = {
    helpers: {
        scrollToBottom: (className) => {
            document.querySelector(className).scrollTo(0, document.querySelector(className).scrollHeight);
        },
        highlightDiv: (_index, className) => {
            const slcs = document.querySelectorAll(className);
            for (let index = 0; index < slcs.length; index++) {
                const element = slcs[index];
                if (_index === index) element.style.background = "#f1f0f0";
                else element.style.removeProperty('background');
            }

        }
    }
}