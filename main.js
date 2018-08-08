// /**
//  * Author: Oren Aksakal <oren.aksakal@oracle.com>
//  * Date: 7/1/18
//  */
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse({ selection: window.getSelection().toString() });
});
//
// // TODO: create element and set class for it and wrap selection by it so you can style
// // var selectedRange = window.getSelection().getRangeAt(0);
// // var newNode = document.createElement('div');
// // newNode.classList.add('selection');
// // selectedRange.surroundContents(newNode);

console.log('WW');
// var range = window.getSelection().getRangeAt(0),
//     span = document.createElement('span');
//
// span.className = 'highlight';
// span.appendChild(range.extractContents());
// range.insertNode(span);