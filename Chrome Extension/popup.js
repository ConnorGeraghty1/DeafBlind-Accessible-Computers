console.log("popup loaded, API access: " + ("serial" in navigator));

document.getElementById('Open Connection Page').addEventListener('click', async () => {

  chrome.runtime.openOptionsPage()

});



