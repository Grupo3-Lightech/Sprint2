const int ldr_pin = A0;
int leitura_ldr = 0;

int switch_pin = 7;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(switch_pin, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  leitura_ldr = analogRead(ldr_pin);
  Serial.println(leitura_ldr);
  delay(1000);
}
