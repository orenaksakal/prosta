// /**
//  * Author: Oren Aksakal <oren.aksakal@oracle.com>
//  * Date: 7/1/18
//  */
//
// const elementIDs = {
//     checkBoxes: ['editableText', 'draggableElements'],
//     inputBoxes: ['fontFamily', 'fontSize', 'fontColor'],
// };
//
// const handleStateChange = (box) => {
//     chrome.storage.local.set({ box: this.checked });
// };
//
// elementIDs.checkBoxes.forEach(checkBox => {
//     document.getElementById(checkBox).addEventListener('change', handleStateChange.bind(checkBox));
// });
//
// elementIDs.inputBoxes.forEach(inputBox => {
//     document.getElementById(inputBox).addEventListener('keyup', handleStateChange.bind(inputBox));
// });
//
// /**
//  * Sets box states on popup open to the latest state
//  */
// (() => {
//     elementIDs.checkBoxes.forEach(elementIdentifier => {
//         chrome.storage.local.get([elementIdentifier], function (result) {
//             let element = document.getElementById(elementIdentifier);
//             element.checked = result.elementIdentifier;
//         });
//     });
//
//     elementIDs.inputBoxes.forEach(elementIdentifier => {
//         chrome.storage.local.get([elementIdentifier], function (result) {
//             let element = document.getElementById(elementIdentifier);
//             element.value = result.elementIdentifier;
//         });
//     });
// })();
//

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' }, function (response) {
        document.getElementById('output').innerHTML = response.selection;
    });
});

fontfamily.addEventListener('input', function () {
    document.getElementById('output').style.fontFamily = fontfamily.value;
});


fontsize.addEventListener('input', function () {
    document.getElementById('output').style.fontSize = fontsize.value;
});

