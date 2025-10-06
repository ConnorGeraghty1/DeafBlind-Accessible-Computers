



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { //listens for incoming messages
    if (message.type === "sendToHost") {
        // The 'data' field contains the tactile command string
        const tactileCommand = message.data;

        // Send the tactileCommand to the native application via native messaging
        chrome.runtime.sendNativeMessage("com.yourcompany.nativehost", { command: tactileCommand }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error communicating with native host:", chrome.runtime.lastError);
            } else {
                console.log("Native host response:", response);
            }
        });
    }
});
