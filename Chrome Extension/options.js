console.log("options loaded, API access: " + ("serial" in navigator));



document.getElementById('portRequest').addEventListener('click', async () => {

    //Access
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        console.log('Connected!');

        

        //Write
        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

        const writer = textEncoder.writable.getWriter();

        console.log("writing a");
        await writer.write("f");

    }     
    catch (err) {
        console.error('Serial connection failed:', err);
    }

});