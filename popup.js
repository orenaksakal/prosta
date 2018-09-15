/**
 * Author: Oren Aksakal <oren.aksakal@oracle.com>
 * Date: 7/1/18
 */

const elementIDs = ['editable', 'draggable'];

const sendMessage = (messageObject, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, messageObject, function (response) {
            callback(response);
        });
    });
};

elementIDs.forEach((selector) => {
    let elementNode = document.getElementById(selector);

    elementNode.addEventListener('change', () => {
        sendMessage({
            messageName: selector,
            state: elementNode.checked
        }, function () {
            // do nothing
        });
    });
});

const handleInitializationResponse = (response) => {
    if (response.selection !== '') {
        document.getElementById('output').innerHTML = response.selection;
    } else {
        document.getElementById('output').innerHTML = 'No text was selected, you are given this one to play with.';
    }

    if (response.editable) {
        document.getElementById('editable').checked = response.editable;
    }

    if (response.draggable) {
        document.getElementById('draggable').checked = response.draggable;
    }
};


fontfamily.addEventListener('input', () => {
    document.getElementById('output').style.fontFamily = fontfamily.value;
});

fontsize.addEventListener('input', () => {
    document.getElementById('output').style.fontSize = fontsize.value;
});

fontcolor.addEventListener('input', () => {
    document.getElementById('output').style.color = fontcolor.value;
});

fontweight.addEventListener('input', () => {
    document.getElementById('output').style.fontWeight = fontweight.value;
});

save.addEventListener('click', () => {
    if (fontfamily.value && fontfamily.value !== ' ' ||
        fontsize.value && fontsize.value !== ' ' ||
        fontcolor.value && fontcolor.value !== ' ' ||
        fontweight.value && fontweight.value !== ' ') {
        sendMessage({
            messageName: 'applyChanges',
            fontfamily: fontfamily.value,
            fontsize: fontsize.value,
            fontcolor: fontcolor.value,
            fontweight: fontweight.value
        }, function () {
            // do nothing
        });
    }
});

sendMessage({ messageName: 'initiate' }, (response) => {
    handleInitializationResponse(response);
});
