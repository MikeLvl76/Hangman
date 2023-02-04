# Based on University project

This project is based on a connected Hangman, an Arduino was sending data and was receiving data in return by WebSocket. Each time the player got an wrong input one led plugged to the Arduino went red and the player lost if 3 LEDs were all red. In this version, the Arduino is removed and instead the count of errors is displayed and the error limit is extended to 5.

## How to run

- Create a `.env` file at the project root and configure these environment variables inside :

    ```
    EXPRESS_PORT= # your port
    VITE_FETCH_PORT= # port used for url fetch, must be the same as EXPRESS_PORT
    MONGO_URI= # your MongoDB URI, default is : mongodb://localhost
    MONGO_DB_NAME= # database name
    ```

- Make sure that you have [Docker](https://www.docker.com/) installed in your device and run these commands :

    - Construct image :
        ```
        docker build -t connected-hangman .
        ```

    - Build containers :
        ```
        docker compose up --build
        ```

Don't forget to install modules with `npm i` command before beginning.
