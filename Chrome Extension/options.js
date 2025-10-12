console.log("options loaded, API access: " + ("serial" in navigator));
let receivedText = "";
let port;
let textEncoder;
let writableStreamClosed;
let writer;
let chars;

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

async function writeCharsSlowly(receivedText) {
  chars = receivedText.split("");

  while (chars.length > 0) {
    console.log("Current List: " + chars.join(''));

    const char = chars[0].toLowerCase();
    console.log("Writing First Char: " + char);

    await writer.write(char);
    chars.shift();

    console.log("New List: " + chars.join(''));
    await sleep(2000); // wait 2 seconds before next character
  }
}



document.getElementById('portRequest').addEventListener('click', async () => {

    //Access
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        console.log('Connected!');

        

        //Write
        textEncoder = new TextEncoderStream();
        writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

        writer = textEncoder.writable.getWriter();
        

        setTimeout(async function(){
            console.log("writing maximum");
            await writer.write("allmax");
        }, 2000);
        

    }     
    catch (err) {
        console.error('Serial connection failed:', err);
    }

});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}