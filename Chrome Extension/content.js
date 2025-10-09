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
        console.log("'read' key pressed pressed");
        console.log(document.activeElement.innerText);
        
    }
});

