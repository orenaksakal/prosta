/**
 * Author: Oren Aksakal <oren.aksakal@oracle.com>
 * Date: 7/1/18
 */
//
// chrome.storage.onChanged.addListener(function (changes) {
//     if (changes.editableText) {
//         document.body.contentEditable = changes.editableText.newValue;
//     }
// });
//
// chrome.storage.local.get(['editableText'], function (result) {
//     if (result.editableText) {
//         document.body.contentEditable = result.editableText;
//     } else {
//         document.body.contentEditable = false;
//     }
// });

//TODO: donot reacreate stype, replace it
function applyChangesToSelection(messageObj) {
    var range = window.getSelection().getRangeAt(0);
    var span = document.createElement('span');
    var css = document.createElement('style');
    var spanClass = 'prosta-highlight-' + Date.now();
    
    function createStyle() {
        css.type = 'text/css';
        css.id = 'prosta';
        css.innerHTML = '.' + spanClass + ' { font-size:' + messageObj.fontsize + '!important; color:' + messageObj.fontcolor + '!important; font-weight:' + messageObj.fontweight + '!important;}';
        document.body.appendChild(css);
    }
    
    span.className = spanClass;
    span.appendChild(range.extractContents());
    range.insertNode(span);
    createStyle();
}

chrome.runtime.onMessage.addListener(function (messageObj, sender, sendResponse) {
    if (messageObj.messageName === 'initiate') {
        sendResponse({
            selection: window.getSelection().toString(),
        });
    } else if (messageObj.messageName === 'applyChanges') {
        applyChangesToSelection(messageObj);
    }
});

//
// // TODO: create element and set class for it and wrap selection by it so you can style
// // var selectedRange = window.getSelection().getRangeAt(0);
// // var newNode = document.createElement('div');
// // newNode.classList.add('selection');
// // selectedRange.surroundContents(newNode);

// function applyChangesToSelection() {
//     var range = window.getSelection().getRangeAt(0);
//     var span = document.createElement('span');
//     var css = document.createElement("style");
//
//     css.type = "text/css";
//     css.innerHTML = ".hightlight { font-size:55px; color: red; }";
//     document.body.appendChild(css);
//
//     span.className = 'highlight';
//     span.appendChild(range.extractContents());
//     range.insertNode(span);
//
//
// }

// var range = window.getSelection().getRangeAt(0);
// var span = document.createElement('span');
//
// span.className = 'highlight';
// span.appendChild(range.extractContents());
// range.insertNode(span);