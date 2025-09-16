// Connor 'Skye' Geraghty
// Microcontroller Code for DeafBlind Accessible Computers
// Project Version: "The Mess" (v0.21)
// C++ code
// Last Edited 9/15/2025 9:38

#include <Servo.h>

Servo pinky;
Servo ring;
Servo middle;
Servo index;
Servo thumb;
Servo thumbWrist;

const int INDEX_MAX = 180;
const int INDEX_MIN = 0;
const int THUMB_MAX = 180;
const int THUMB_MIN = 0;
const int MIDDLE_MAX = 180;
const int MIDDLE_MIN = 0;
const int RING_MAX = 0;
const int RING_MIN = 180;
const int PINKY_MAX = 0;
const int PINKY_MIN = 180;
const int THUMBWRIST_MAX = 0;
const int THUMBWRIST_MIN = 90;

const String alphabet = "abcdefghijklmnopqrstuvwxyz";
const int posMap[26][6] = {
  //pinky ring middle index thumb thumbWrist
  //0 max pulled in, 2 max pushed out
  //thumbWrist is exact degrees
  { 0, 0, 0, 0, 0, 90 },  //a
  { 2, 2, 2, 2, 0, 90 },  //b
  { 1, 1, 1, 1, 0, 0 },   //c
  { 0, 0, 0, 2, 1, 45 },  //d
  { 1, 1, 1, 0, 0, 90 },  //e
  { 2, 2, 2, 0, 0, 0 },   //f
  { 0, 0, 0, 2, 1, 45 },  //g
  { 0, 0, 2, 2, 1, 45 },  //h
  { 2, 0, 0, 0, 0, 90 },  //i
  { 2, 0, 0, 0, 0, 90 },  //j
  { 0, 0, 1, 2, 0, 60 },  //k
  { 0, 0, 0, 2, 2, 90 },  //l
  { 0, 1, 1, 1, 0, 0 },   //m
  { 1, 0, 1, 1, 0, 70 },  //n
  { 0, 1, 1, 1, 0, 90 },  //o
  { 0, 0, 1, 2, 0, 60 },  //p
  { 0, 0, 0, 2, 0, 90 },  //q
  { 0, 0, 2, 2, 0, 0 },   //r
  { 0, 0, 0, 0, 0, 30 },  //s
  { 0, 0, 0, 1, 0, 30 },  //t
  { 0, 0, 2, 2, 0, 0 },   //u
  { 0, 0, 2, 2, 0, 0 },   //v
  { 0, 2, 2, 2, 0, 0 },   //w
  { 0, 0, 0, 1, 0, 30 },  //x
  { 2, 0, 0, 0, 2, 90 },  //y
  { 0, 0, 0, 2, 0, 30 }   //z
};

void setup() {
  pinky.attach(10, 500, 2500);
  pinky.write(PINKY_MIN);
  ring.attach(9, 500, 2500);
  ring.write(RING_MIN);
  middle.attach(6, 500, 2500);
  middle.write(MIDDLE_MIN);
  index.attach(5, 500, 2500);
  index.write(INDEX_MIN);
  thumb.attach(3, 500, 2500);
  thumb.write(THUMB_MIN);
  thumbWrist.attach(11, 500, 2500);
  thumbWrist.write(THUMBWRIST_MIN);

  Serial.begin(9600);
}

void loop() {
  delay(100);
  if (Serial.available()) {
    delay(100);  // Allow time for full data to arrive
    String receivedData = "";

    while (Serial.available()) {
      char incomingChar = Serial.read();  // Read one character at a time
      receivedData += incomingChar;       // Append to full string
      delay(5);
    }
    receivedData.trim();  // Clean up spaces/newlines
    char firstChar = receivedData.charAt(0);


    //6-digit-code translations

    //pinky index
    if (posMap[alphabet.indexOf(firstChar)][0] == 0) {
      pinky.write(PINKY_MAX);
    }
    if (posMap[alphabet.indexOf(firstChar)][0] == 1) {
      pinky.write(PINKY_MAX / 2);
    }
    if (posMap[alphabet.indexOf(firstChar)][0] == 2) {
      pinky.write(PINKY_MIN);
    }

    //ring index
    if (posMap[alphabet.indexOf(firstChar)][1] == 0) {
      ring.write(RING_MAX);
    }
    if (posMap[alphabet.indexOf(firstChar)][1] == 1) {
      ring.write(RING_MAX / 2);
    }
    if (posMap[alphabet.indexOf(firstChar)][1] == 2) {
      ring.write(RING_MIN);
    }

    //middle index
    if (posMap[alphabet.indexOf(firstChar)][2] == 0) {
      middle.write(MIDDLE_MAX);
    }
    if (posMap[alphabet.indexOf(firstChar)][2] == 1) {
      middle.write(MIDDLE_MAX / 2);
    }
    if (posMap[alphabet.indexOf(firstChar)][2] == 2) {
      middle.write(MIDDLE_MIN);
    }

    //index index
    //haha "index index"
    if (posMap[alphabet.indexOf(firstChar)][3] == 0) {
      index.write(INDEX_MAX);
    }
    if (posMap[alphabet.indexOf(firstChar)][3] == 1) {
      index.write(INDEX_MAX / 2);
    }
    if (posMap[alphabet.indexOf(firstChar)][3] == 2) {
      index.write(INDEX_MIN);
    }

    //thumb index
    if (posMap[alphabet.indexOf(firstChar)][4] == 0) {
      thumb.write(THUMB_MAX);
    }
    if (posMap[alphabet.indexOf(firstChar)][4] == 1) {
      thumb.write(THUMB_MAX / 2);
    }
    if (posMap[alphabet.indexOf(firstChar)][4] == 2) {
      thumb.write(THUMB_MIN);
    }

    //thumbwrist index
    thumbWrist.write(posMap[alphabet.indexOf(firstChar)][5]);

    //dev commands

    //allmax:
    //       all servos go to furthest position
    //       makes a fist
    if (receivedData == "allmax") {
      index.write(INDEX_MAX);
      delay(50);
      middle.write(MIDDLE_MAX);
      delay(50);
      ring.write(RING_MAX);
      delay(50);
      pinky.write(PINKY_MAX);
      delay(50);
      thumb.write(THUMB_MAX);
      delay(50);
      thumbWrist.write(THUMBWRIST_MAX);
      delay(50);
    }


    //allmin:
    //       all servos go to closest position
    //       makes an open palm
    else if (receivedData == "allmin") {
      index.write(INDEX_MIN);
      delay(50);
      middle.write(MIDDLE_MIN);
      delay(50);
      ring.write(RING_MIN);
      delay(50);
      pinky.write(PINKY_MIN);
      delay(50);
      thumb.write(THUMB_MIN);
      delay(50);
      thumbWrist.write(THUMBWRIST_MIN);
      delay(50);
    }

    //thumbsup:
    //         take a wild guess
    else if (receivedData == "thumbsup") {
      index.write(INDEX_MAX);
      middle.write(MIDDLE_MAX);
      ring.write(RING_MAX);
      pinky.write(PINKY_MAX);
      thumb.write(THUMB_MIN);
      thumbWrist.write(THUMBWRIST_MIN);
    }

    //special case:
    //  format: fn ang
    //    fn is one of -
    //      pinky
    //      middle
    //      ring
    //      index
    //      thumb
    //      thumbWrist
    //    ang is a number between 0 and 180
    //  directs the specified finger to the specified angle
    else {
      int receivedLength = receivedData.length();  // Get full input length

      char rawChar;

      String finger = receivedData.substring(0, receivedData.indexOf(" "));
      int position = receivedData.substring(receivedData.indexOf(" ") + 1).toInt();

      if (finger.equals("index")) {
        index.write(position);
      }
      if (finger.equals("middle")) {
        middle.write(position);
      }
      if (finger.equals("ring")) {
        ring.write(position);
      }
      if (finger.equals("pinky")) {
        pinky.write(position);
      }
      if (finger.equals("thumb")) {
        thumb.write(position);
      }
      if (finger.equals("thumbWrist")) {
        thumbWrist.write(position);
      }
    }
  }
}
