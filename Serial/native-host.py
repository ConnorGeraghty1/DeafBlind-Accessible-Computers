import sys
import json
import serial
import time

# Configure serial port (adjust COM as needed)
arduino = serial.Serial(port="COM4", baudrate=9600, timeout=1)

# Debugging: Confirm the connection opens
if arduino.is_open:
    print("Serial connection opened successfully on", arduino.port)
else:
    print("Error: Serial connection failed.")

def read_message():
    """Read JSON message from Chrome extension and print debug info."""
    try:
        raw_message = sys.stdin.read()
        print("Received raw message:", raw_message)  # Debugging output
        if raw_message:
            message = json.loads(raw_message)
            print("Parsed JSON:", message)  # Debugging output
            return message.get("command", "")
    except json.JSONDecodeError as e:
        print("JSON decoding error:", str(e))  # Debugging output
        return ""


time.sleep(2)  # Pause for processing

if __name__ == "__main__":
    arduino.write(read_message().encode('utf-8'))
