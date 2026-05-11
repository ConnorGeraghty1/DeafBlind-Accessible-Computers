console.log("content loaded, API access: " + ("serial" in navigator));

/**
 * All text and element labels on the page
 */
fullText = document.body.fullText;

/**
 * An array of each text segment and element label on the page
 */
fullParsed = fullText.split("\n");

/**
 * Provided page has elements set an active element to be
 */
if(fullParsed.length > 0){
    
    activeAnything = fullParsed[0];

}
else{
    throw new Error("Page is empty.");
}

//Check that WebSerial is compatible
if ("serial" in navigator) {
    console.log("Content: WebSerial Supported");
}
else {
    console.log("Content: WebSerial NOT Supported");
}

function moveActiveAnything(direction){

    const activeCurrentIndex = fullParsed.indexOf(activeAnything);

    if(activeCurrentIndex == fullParsed.length-1 && direction == 1){
        activeAnything = fullParsed[0];
    } else if (activeCurrentIndex == 0 && direction == -1){
        activeAnything = fullParsed[fullParsed.length-1];
    } else{

        activeAnything = fullParsed[activeCurrentIndex += direction];
    
    }
}


/**
 * Helper method to get element if it's clickable
 * @param {string} targetText the inner text of the element to retrieve 
 * @returns The element containing the provided string
 */
function getElementByString(targetText) {

    const xpath = `//${"*"}[text()="${targetText}"]`;

    return document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

document.addEventListener("keydown", (e) => {

    //These keybinds can be set to anything, I just use a one-handed keyboard that happens to have these. -CSG

    if (e.key === "4") {
        e.preventDefault();
        console.log("'read' key pressed pressed");
        console.log("From Content: " + activeAnything);
        
        chrome.runtime.sendMessage({ type: "elementText", data: activeAnything });

    }
    //next element
    if (e.key === "3") {
        e.preventDefault();
        moveActiveAnything(1);
        console.log("back");

    }
    //previous element
    if (e.key === "1") {
        e.preventDefault();
        moveActiveAnything(-1);
        console.log("forward");

    }
    //click element element
    if (e.key === "2") {
        element = getElementByString(activeAnything);
        if(!element){
            throw new Error("This text does not have a corresponding element.");
        }
        document.activeElement.click();

    }
});

