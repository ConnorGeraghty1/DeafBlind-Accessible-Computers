console.log("options loaded, API access: " + ("serial" in navigator));

document.getElementById('portRequest').addEventListener('click', async () => {

  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    console.log('Connected!');
  } catch (err) {
    console.error('Serial connection failed:', err);
  }
});



