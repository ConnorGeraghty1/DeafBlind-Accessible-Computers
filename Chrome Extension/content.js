// CODELAB: Add feature detection here.
const notSupported = document.getElementById('notSupported');
notSupported.classList.toggle('hidden', 'serial' in navigator);

/*
port = await navigator.serial.requestPort(); //request port for serial connection

await port.open({ baudrate: 9600 }); //wait for port to open
*/


document.addEventListener("keydown", (e) => {
    if (e.key === "2") {
        e.preventDefault(); // Prevent default browser behavior

        // Get the currently focused element
        const elem = document.activeElement;
        let text = "";

        // Extract text from the focused element
        if (elem) {
            text = elem.innerText || elem.value || "";
        }

        if (text) {
            // Send extracted text to background script
            chrome.runtime.sendMessage({
                type: "sendToHost",
                data: text
            });
        }
    }
});
