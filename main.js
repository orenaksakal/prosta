/**
 * Author: Oren Aksakal <oren.aksakal@oracle.com>
 * Date: 7/1/18
 */

const applyChangesToSelection = (messageObj) => {
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement('span');
    const css = document.createElement('style');
    const spanClass = 'prosta-highlight-' + Date.now();

    const createStyle = () => {
        css.type = 'text/css';
        css.id = 'prosta';
        css.innerHTML = '.' + spanClass + ' { font-size:' + messageObj.fontsize + '!important; color:' + messageObj.fontcolor + '!important; font-weight:' + messageObj.fontweight + '!important;}';
        document.body.appendChild(css);
    };

    span.classList.add(spanClass);
    span.appendChild(range.extractContents());
    range.insertNode(span);
    createStyle();
};

chrome.runtime.onMessage.addListener(function (messageObj, sender, sendResponse) {
    if (messageObj.messageName === 'initiate') {
        sendResponse({
            selection: window.getSelection().toString(),
            draggable: document.body.draggable,
            editable: document.designMode !== 'off'
        });
    } else if (messageObj.messageName === 'applyChanges') {
        applyChangesToSelection(messageObj);
    }
    else if (messageObj.messageName === 'editable') {
        let state = messageObj.state ? 'on' : 'off';
        document.designMode = state;
    } else if (messageObj.messageName === 'draggable') {
        document.body.draggable = messageObj.state;
    }
});
