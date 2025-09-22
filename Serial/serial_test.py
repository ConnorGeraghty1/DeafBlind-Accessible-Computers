import serial
import time

arduino = serial.Serial(port="COM4", baudrate=9600)

while True :
    #input handling
    user_input = input("Enter Command: ")

    # Sending "1" with explicit encoding and flushing
    test_command = user_input  
    arduino.write(test_command.encode('utf-8'))
    arduino.flush()  # Ensure immediate transmission

    print("Sent to Arduino:", test_command)
    time.sleep(2)
