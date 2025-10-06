//Check that WebSerial is compatible
if ("serial" in navigator) {
    console.log("Popup: WebSerial Supported");
}
else {
    console.log("Popup: WebSerial NOT Supported");
}


// logPorts: Void -> String
// logs the current ports available to the navigator
function logPorts() {
    console.log("Ports: " + navigator.serial.getPorts());
}

//Retrive button for ports
document.getElementById("logPorts").addEventListener("click", logPorts);



