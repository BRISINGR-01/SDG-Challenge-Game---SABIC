# EN
### Appendix
RFID - Radio Frequency IDentification. A piece of hardware that can distinguish cards.
ESP32 - This piece of hardware that is used to connect to the internet.
Jumpwires - cables that connect different hardware.

### The game
The aim of the game is to get people to compete to recycle more. If an employee recycles plastic, they can scan their badge and earn points. They can then see on a website which of their employees has the most points.

### Software
The UI consists of two parts - leaderboard and account creation. They are connected with supabase's realtime connection with the server, which communicates with the hardware. The server processes the data from the card reader, then stores the data on a Supabase database and then the UI shows the new score to the user. For this, the hardware requires an RFID and an HTTP library. The server is hosted at [https://sdg-challenge-game-sabic.vercel.app/](https://sdg-challenge-game-sabic.vercel.app/) by Vercel.

##### Overview
- Server & UI- Typescript, Next JS, ThreeJS, React, Supabase, Vercel
- card reader - C++, Platform IO (IDE), MFRC522-spi-i2c-uart-async (RFID), ArduinoHttpClient

### Hardware
With the help of a friend who studies technology in Fontys, I borrowed all the necessary parts from ISSD. He showed me how and which technologies to use to connect an RFID card reader to the internet via an ESP32.

##### Overview
- ESP 32
- RFID card reader
- 7 jump wires
- A Male - Micro B Male cable
- A few Fontys, fitness, waste or guest/worker cards

### Cost
Here is an overview of the costs. The company (SABIC) needs them to determine whether the design is worth the investment.
- RFID RC522 - ~10€
- Jumpwires - ~20 cents each * 7 = €1.40
- ESP32 - ~9€
- Micro B cable - ~2€
Total - ~22€

![hardware](https://github.com/BRISINGR-01/SDG-Challenge-Game-SABIC/blob/main/images/Pasted%20image%2020240420155729.png)
![game](https://github.com/BRISINGR-01/SDG-Challenge-Game-SABIC/blob/main/images/Screenshot%20from%202024-04-24%2023-40-02.png)

# NL
### Appendix
RFID - Radio Frequency IDentification. Een hardwarestuk dat kaarten kan onderscheiden.
ESP32 - Deze hardwarestuk wordt gebruikt om met het internet te verbinden.
Jumpwires - kabels die verschillende hardware's verbinden.

### De spel
Het doel van het spel is om mensen te laten concurreren om meer te recyclen. Als een medewerker plastic recycled, kan hij zijn badge scannen en punten verdienen. Op een website kan hij dan zien wie van zijn medewerkers de meeste punten heeft.

### Software
De UI bestaat uit twee delen - leaderboard en accountcreatie. Ze zijn verbonden met een websocket naar de server, die met de hardware communiceert. De server verwerkt de gegevens van de kaartlezer, en de gegevens vervolgens op een Supabase database en daarna laat de UI de nieuwe score aan de gebruiker zien. Hiervoor heeft de hardware een RFID en een http library nodig. De server wordt gehost op [https://sdg-challenge-game-sabic.vercel.app/](https://sdg-challenge-game-sabic.vercel.app/) door Vercel.

##### Overzicht
- Server & UI- Typescript, Next JS, ThreeJS, React, Supabase, Vercel
- kaart lezer - C++, Platform IO (IDE), MFRC522-spi-i2c-uart-async (RFID), ArduinoHttpClient

### Hardware
Met hulp van een vriend, die technologie in Fontys studeert, heb ik alle benodigde delen van ISSD geleend. Hij heeft me getoond hoe en welke technologieën te gebruiken om een RFID kaartlezer met het internet te verbinden via een ESP32.

##### Overzicht
- ESP 32
- RFID kaart lezer
- 7 jumpwires
- A Male - Micro B Male kabel
- Een paar Fontys, fitness, afval of guest/worker kaarten

### Kosten
Hier is een overzicht van de kosten. Het bedrijf (SABIC) heeft ze nodig om te bepalen of het ontwerp de investering waard is.
- RFID RC522  - ~10€
- Jumpwires - ~20 cents each * 7 = 1.40€
- ESP32 - ~9€
- Micro B cable - ~2€
Total - ~22€
