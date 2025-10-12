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
    chars = receivedText.split("");
    while (chars.length > 0) {
        
        //split up the string by characters
        console.log("Current List: " + chars.join(''));

        //provide 2 seconds to log and write the first character
            
        console.log("Writing First Char: " + chars[0].toLowerCase());
        writer.write(chars[0].toLowerCase());

        //remove first character

        chars.shift();
        console.log("New List: " + chars.join(''));

        sleep(2000);
    }
    
});


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
        
        //!!! MOVE THIS OUT THE LOOP PRO FLAOVR
        

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