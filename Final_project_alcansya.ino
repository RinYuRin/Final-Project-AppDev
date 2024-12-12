#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ESP32Servo.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

Servo myServo;
const int servoPin = 18;
Adafruit_SSD1306 display(128, 64, &Wire, -1);

#define IR_SENSOR_PIN 12
#define trigPin 2
#define echoPin 15
#define Buzzer 14

long duration;
int distance;
int objectCount = 1;
bool objectDetected = false;
bool lastState = HIGH;

unsigned long lastDetectionTime = 0;
const unsigned long resetInterval = 10000;

//for wifi and firebase
#define WIFI_SSID "RinYuRin"
#define WIFI_PASSWORD "RinYuRin"
#define API_KEY "web api of firebase"
#define DATABASE_URL "database url"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
unsigned long sendDataPrevMillis = 0;

void setup() {
  // Initialize serial communication
  Serial.begin(115200);

  // Initialize pins
  pinMode(trigPin, OUTPUT);
  pinMode(Buzzer, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(IR_SENSOR_PIN, INPUT);

  // Initialize OLED display
  delay(500);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3c)) {
    Serial.println("Can't initialize OLED display");
  }

  // Attach the servo
  myServo.attach(servoPin);

  // wifi connectin
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  // firebase config
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase Sign Up Successful");
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void display_oled() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 10);
  display.setTextColor(WHITE);
}

void getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration / 2) / 29.1;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println("cm");
}

void updateFirebase(int count) {
  if (Firebase.ready()) {
    String path = "/objectCount";
    if (Firebase.RTDB.setInt(&fbdo, path.c_str(), count)) {
      Serial.println("Firebase updated successfully");
    } else {
      Serial.printf("Firebase update failed: %s\n", fbdo.errorReason().c_str());
    }
  }
}

void loop() {
  bool currentState = digitalRead(IR_SENSOR_PIN);

  // OLED Display Settings
  display_oled();
  getDistance();

  int lima = objectCount * 5;

  // Object Counter Logic
  if ((distance < 3 && distance > 0) || (currentState == LOW && lastState == HIGH)) {
    if (!objectDetected) {
      objectDetected = true;
      objectCount++;
      Serial.print("Object Detected Count: ");
      Serial.println(lima);

      display.setTextSize(1);
      display.println("Object Detected Count");
      display.println("");
      display.print("         ");
      display.setTextSize(3);
      display.println(lima);
      display.display();
      delay(100);

      // Servo sweep
      for (int angle = 0; angle <= 180; angle += 5) {
        myServo.write(angle);
        delay(20);
      }
      for (int angle = 180; angle >= 0; angle -= 5) {
        myServo.write(angle);
        delay(20);
      }

      // Buzzer alarm
      digitalWrite(Buzzer, HIGH);
      delay(500);
      digitalWrite(Buzzer, LOW);
      delay(50);

      // update thefirebase
      updateFirebase(lima);
    }
    lastDetectionTime = millis();
  } else {
    if (objectDetected) {
      objectDetected = false;
    }
  }

  if (millis() - lastDetectionTime > resetInterval && objectCount > 0) {
    objectCount = 1;
    Serial.println("No detection for 10 seconds. Counter reset to 0.");
    updateFirebase(0);

    display_oled();
    display.setTextSize(1);
    display.println("No detection for 10 seconds.");
    display.println("");
    display.println("  Counter reset to");
    display.println("");
    display.setTextSize(2);
    display.print("    ");
    display.print("0");
    display.display();
    delay(100);
  }
}




