#include <secrets.h>
#include <MFRC522.h> //library responsible for communicating with the module RFID-RC522
#include <SPI.h>     //library responsible for communicating of SPI bus
#include <WiFi.h>
#include <HTTPClient.h>
#define SS_PIN 21
#define RST_PIN 22
#define SIZE_BUFFER 18
#define MAX_SIZE_BLOCK 16

MFRC522::MIFARE_Key key;
MFRC522::StatusCode status;
MFRC522 mfrc522(SS_PIN, RST_PIN);

const char *wifiName = WIFI_NAME;
const char *wifiPassword = WIFI_PASSWORD;
const char *supabaseURL = SUPABASE_URL;
String supabaseAPIToken = SUPABASE_API_TOKEN;

String url = "https://$supabaseURL.supabase.co/rest/v1/card_read";
WiFiClient wifi;
HTTPClient client;

void setup()
{
  url.replace("$supabaseURL", supabaseURL);

  Serial.begin(9600);
  SPI.begin();

  mfrc522.PCD_Init();

  WiFi.begin("Alex's Galaxy S21 FE 5G", "rbmj4667");
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}

String readingData()
{
  String cardId = "";

  // prints the technical details of the card/tag
  mfrc522.PICC_DumpDetailsToSerial(&(mfrc522.uid));
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    cardId += String(mfrc522.uid.uidByte[i], HEX);
    Serial.print(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println(cardId);
  Serial.println();

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
    return cardId;
  }

  // read data from block
  status = mfrc522.MIFARE_Read(block, buffer, &size);
  if (status != MFRC522::STATUS_OK)
  {
    Serial.print(F("Reading failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    return cardId;
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

  return cardId;
}

void sendData(String cardId)
{
  String postData = "{ \"card_id\": \"$cardID\" }";
  postData.replace("$cardID", cardId);
  Serial.println(postData);

  client.begin(url);

  client.addHeader("Content-Type", "application/json");
  client.addHeader("apikey", supabaseAPIToken);
  client.addHeader("Authorization", "Bearer " + supabaseAPIToken);

  Serial.println(client.POST(postData));
  Serial.println(client.getString());

  client.end();
}

void loop()
{
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Select a card
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }

  String cardId = readingData();

  // instructs the PICC when in the ACTIVE state to go to a "STOP" state
  mfrc522.PICC_HaltA();
  // "stop" the encryption of the PCD, it must be called after communication with authentication, otherwise new communications can not be initiated
  mfrc522.PCD_StopCrypto1();

  if (cardId.length() == 0)
    return;

  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("WiFi Disconnected");
    return;
  }

  Serial.println(cardId);

  sendData(cardId);
}
