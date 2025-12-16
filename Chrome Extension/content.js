console.log("content loaded, API access: " + ("serial" in navigator));




//Check that WebSerial is compatible
if ("serial" in navigator) {
    console.log("Content: WebSerial Supported");
}
else {
    console.log("Content: WebSerial NOT Supported");
}


function moveFocus(direction = 1, container = document.body) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  const focusable = Array.from(container.querySelectorAll(focusableSelectors.join(',')))
    .filter(el => el.offsetParent !== null); // skip hidden elements

  const currentIndex = focusable.indexOf(document.activeElement);
  let nextIndex = currentIndex + direction;

  // Wrap around if needed
  if (nextIndex >= focusable.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = focusable.length - 1;

  focusable[nextIndex]?.focus();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "4") {
        e.preventDefault(); // Prevent default browser behavior
        // Get the currently focused element

        let elementText = document.activeElement.innerText;
        console.log("'read' key pressed pressed");
        console.log("From Content: " + elementText);
        
        chrome.runtime.sendMessage({ type: "elementText", data: elementText });

    }
    //next element
    if (e.key === "3") {
        e.preventDefault();
        moveFocus(1);
        console.log("back");

    }
    //previous element
    if (e.key === "1") {
        e.preventDefault();
        moveFocus(-1);
        console.log("forward");

    }
    //click element element
    if (e.key === "2") {
        e.preventDefault();
        document.activeElement.click();

    }
});

