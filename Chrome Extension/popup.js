/**
 * Exists for the sole purpose of providing easy access to the options page
 */

console.log("popup loaded, API access: " + ("serial" in navigator));

document.getElementById('Open Connection Page').addEventListener('click', async () => {

  chrome.runtime.openOptionsPage()

});


