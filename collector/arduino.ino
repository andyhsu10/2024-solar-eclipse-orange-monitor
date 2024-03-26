#include <Arduino.h>
#include <Wire.h>
#include "Adafruit_HTU21DF.h"
#include <BMP180I2C.h>

#define I2C_ADDRESS 0x77

BMP180I2C bmp180(I2C_ADDRESS);
Adafruit_HTU21DF htu = Adafruit_HTU21DF();

float hTemp;
float hHum;
float bPressure;
float bTemp;
long periodRead = 250;
long preMillRead = 0;


int inByte = 0;         // incoming serial byte
int readN = 0;
char SerialCharBegin = ':';
char SerialCharEnd = '#';
char bufferTxt[30] = "\0";


void setup() {
  Serial.begin(115200);
  
   if (!htu.begin()) {
   Serial.println("TH sensor failed!");
   while (1);
   }


  if (!bmp180.begin())
	{
		Serial.println("begin() failed. check your BMP180 Interface and I2C Address.");
		while (1);
	}

	//reset sensor to default parameters.
	bmp180.resetToDefaults();

	//enable ultra high resolution mode for pressure measurements
	bmp180.setSamplingMode(BMP180MI::MODE_UHR);
}

void loop() {
  
  SerialReadLoop();
}

void getMain(){
  String outputS;
  //Serial.println(millis() - preMillRead);
  if (abs(millis() - preMillRead) > periodRead){
    getHTU();
	//start a temperature measurement
	if (!bmp180.measureTemperature())
	{
		Serial.println("could not start temperature measurement, is a measurement already running?");
		return;
	}

	//wait for the measurement to finish. proceed as soon as hasValue() returned true. 
	do
	{
		delay(10);
	} while (!bmp180.hasValue());
  bTemp = bmp180.getTemperature();
	// Serial.print("Temperature: "); 
	// Serial.print(bTemp); 
	// Serial.println(" degC");

	//start a pressure measurement. pressure measurements depend on temperature measurement, you should only start a pressure 
	//measurement immediately after a temperature measurement. 
	if (!bmp180.measurePressure())
	{
		Serial.println("could not start perssure measurement, is a measurement already running?");
		return;
	}

	//wait for the measurement to finish. proceed as soon as hasValue() returned true. 
	do
	{
		delay(10);
	} while (!bmp180.hasValue());
  bPressure = bmp180.getPressure() / 100; //hpa
	// Serial.print("Pressure: "); 
	// Serial.print(bPressure);
	// Serial.println(" Pa");

    outputS = ":i" + 
    String(hTemp) + "," + 
    String(hHum) + "," + 
    String(bPressure) + "," +
    String(bTemp) + "#";
    Serial.println(outputS);
  preMillRead = millis();
  }
}

void getHTU(){
    hTemp=htu.readTemperature();
    hHum=htu.readHumidity();
}

void parseInput(char input[], int startpos, int len) {  
  float pos=0;
  String str;

  switch (input[startpos]) {
    
    case 'I': //[long]Move to position eg, move to 10000, :L10000#
      getMain();
    break;
  
    default:
    break;
  }
}



void SerialReadLoop() {
  if (Serial.available() > 0) {
    inByte = Serial.read();   // get incoming byte:
    //initAutoClose();
    if (inByte == SerialCharBegin) {      
      clearBufferTxt();  //initial reading buffer
      bufferTxt[0] = inByte;
      readN = 1;
    }
    else if (inByte == SerialCharEnd) {
      bufferTxt[readN++] = inByte;
      char readtxt[readN];
      int ri = 0;
      while (ri <= readN-1) {
        readtxt[ri] = bufferTxt[ri];
        ri++; 
      }
      parseInput(readtxt, 1, readN-1);
    }
    else {
      bufferTxt[readN++] = inByte;
    }    
  }
  
}

void clearBufferTxt() {
  int i = 0;
  while (i <= readN) {
    bufferTxt[i] = '\0';
    i++;
  }
  readN = 0;
}

String int2fixDigitString(int input, int digits){
  String str;
  str = (String)input;
  while(str.length() < digits){
    str = "0" + str;
  }
  return str;
}

long char2long(char input[], int startDigit, int len) {   //input a char array, with digits to read
      int lastpos = startDigit + len;
      int i = startDigit;
      char buffer[len];
      while (i < lastpos-1) {
        buffer[i - startDigit] = input[i];
        //Serial.println(input[i]);
        i++;
      }
      return atol(buffer);
}

float char2float(char input[], int startDigit, int len) {   //input a char array, with digits to read
      int lastpos = startDigit + len;
      int i = startDigit;
      char buffer[len];
      while (i < lastpos-1) {
        buffer[i - startDigit] = input[i];
        //Serial.println(input[i]);
        i++;
      }
      return atof(buffer);
}