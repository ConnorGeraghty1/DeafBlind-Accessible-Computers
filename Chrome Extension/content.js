console.log("content loaded, API access: " + ("serial" in navigator));




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

        let elementText = document.activeElement.innerText;
        console.log("'read' key pressed pressed");
        console.log("From Content: " + elementText);
        
        chrome.runtime.sendMessage({ type: "elementText", data: elementText });

    }
});

