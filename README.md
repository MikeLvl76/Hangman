# Based on Univeristy project

This project is based on a connected Hangman, an Arduino was sending data and was receiving data in return by WebSocket. Each time the player got an wrong input one led plugged to the Arduino went red and the player lost if 3 LEDs were all red. In this version, the Arduino is removed and instead the count of errors is displayed and the error limit is extended to 5.

## How to run

You have to run client and server at the same time. Here is the commands below :

- Client : 

    ```
    npm run dev
    ```

- Server :

    ```
    npm start
    ```

Don't forget to install modules in both directories with `npm i`.