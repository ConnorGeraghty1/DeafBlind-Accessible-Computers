//Check that WebSerial is compatible
if ("serial" in navigator) {
    console.log("Content: WebSerial Supported");
}
else {
    console.log("Content: WebSerial NOT Supported");
}


document.addEventListener("keydown", (e) => {
    if (e.key === "`") {
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
