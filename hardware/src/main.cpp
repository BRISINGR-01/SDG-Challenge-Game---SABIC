#include <MFRC522.h> //library responsible for communicating with the module RFID-RC522
#include <SPI.h>     //library responsible for communicating of SPI bus
#include <WiFi.h>
#include <HTTPClient.h>
#define SS_PIN 21
#define RST_PIN 22
#define SIZE_BUFFER 18
#define MAX_SIZE_BLOCK 16
// used in authentication
MFRC522::MIFARE_Key key;
// authentication return status code
MFRC522::StatusCode status;
// Defined pins to module RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

const char *ssid = "Alex's Galaxy S21 FE 5G"; // The SSID (name) of the Wi-Fi network you want to connect to
const char *password = "rbmj4667";

String serverName = "http://192.168.1.113/api/notify?val=";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
// unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

void setup()
{
  Serial.begin(9600);
  SPI.begin();

  mfrc522.PCD_Init();
  Serial.println("Approach your reader card...");
  Serial.println();

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

// reads data from card/tag
void readingData()
{
  // prints the technical details of the card/tag
  mfrc522.PICC_DumpDetailsToSerial(&(mfrc522.uid));

  // prepare the key - all keys are set to FFFFFFFFFFFFh
  for (byte i = 0; i < 6; i++)
    key.keyByte[i] = 0xFF;

  // buffer for read data
  byte buffer[SIZE_BUFFER] = {0};

  // the block to operate
  byte block = 1;
  byte size = SIZE_BUFFER;
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, block, &key, &(mfrc522.uid)); // line 834 of MFRC522.cpp file
  if (status != MFRC522::STATUS_OK)
  {
    Serial.print(F("Authentication failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }

  // read data from block
  status = mfrc522.MIFARE_Read(block, buffer, &size);
  if (status != MFRC522::STATUS_OK)
  {
    Serial.print(F("Reading failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }

  Serial.print(F("\nData from block ["));
  Serial.print(block);
  Serial.print(F("]: "));

  // prints read data
  for (uint8_t i = 0; i < MAX_SIZE_BLOCK; i++)
  {
    Serial.write(buffer[i]);
  }
  Serial.println(" ");
}

void loop()
{
  if ((millis() - lastTime) > timerDelay)
  {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED)
    {
      HTTPClient http;

      // Your Domain name with URL path or IP address with path
      http.begin(serverName.c_str());

      // If you need Node-RED/server authentication, insert user and password below
      // http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");

      // Send HTTP GET request
      int httpResponseCode = http.GET();

      if (httpResponseCode > 0)
      {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else
      {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else
    {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }

  // Aguarda a aproximacao do cartao
  // waiting the card approach
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Select a card
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }

  // Dump debug info about the card; PICC_HaltA() is automatically called
  //  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));</p><p>  //call menu function and retrieve the desired option
  readingData();

  // instructs the PICC when in the ACTIVE state to go to a "STOP" state
  mfrc522.PICC_HaltA();
  // "stop" the encryption of the PCD, it must be called after communication with authentication, otherwise new communications can not be initiated
  mfrc522.PCD_StopCrypto1();
}
