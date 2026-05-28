/**
 * This configures the port access and acts as the serial connection. Chrome doesn't allow port access without a dedicated page request,
 * hence the options page.
 */

console.log("options loaded, API access: " + ("serial" in navigator));
let receivedText = "";
let port; 
let textEncoder;
let writableStreamClosed;
let writer;
let chars;

/**
 * Listens to any native messages sent from any webpage in chrome, and assumes that it is text to write to serial
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "elementText") {
        console.log("Outputter received: ", message.data);
        receivedText = message.data;
    }
    writeCharsSlowly(receivedText);
    
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Adapted version of the deprecated writeChars method, helper method to receive text and write letter commands to serial.
 * @param {String} receivedText the text to write
 */
async function writeCharsSlowly(receivedText) {
  chars = receivedText.split("");

  while (chars.length > 0) {
    console.log("Current List: " + chars.join(''));

    const char = chars[0].toLowerCase();
    console.log("Writing First Char: " + char);

    await writer.write(char);
    chars.shift();

    console.log("New List: " + chars.join(''));
    await sleep(1000); // wait 1 second before next character
  }
}


//When "Connect to Device" button is pressed, the port request is initialized
document.getElementById('portRequest').addEventListener('click', async () => {

    //Attempt access
    try {

      //Prompts a visual popup where the user can select the device to connect to
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      console.log('Connected!');

      //Configures the writer to the correct port
      textEncoder = new TextEncoderStream();
      writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
      writer = textEncoder.writable.getWriter();
        

      //Clenched fist indicates physical success
      setTimeout(async function(){
          console.log("writing maximum");
          await writer.write("allmax");
        }, 
        2000);
      

    }     
    catch (err) {
        console.error('Serial connection failed:', err);
    }

});


/**
 * Pauses the program temporarily
 * This could very well be an inefficient sleep function, but it works so I'd rather not touch it
 * @param {int} milliseconds the number of milliseconds to wait 
 */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}