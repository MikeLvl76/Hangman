# Based on University project

## About

<div>
<p style="text-align: justify;">
This project is based on a connected Hangman, an Arduino was sending data and was receiving data in return by WebSocket. Each time the player got an wrong input one led plugged to the Arduino went red and the player lost if 3 LEDs were all red. 

This version has many differences :

- Instead of using Express and MongoDB for storing game results I use LocalStorage which is better for this kind of game.

- Express is removed because it became useless.

- Docker is also removed and instead I used Github Pages for a better deployment.

- And of course, there is no Arduino anymore.

- Refactored code and better implementation

Maybe I will create a new repo for the old one.
</p>


## Get started

***If you just want to play click [here](https://mikelvl76.github.io/Hangman/)***

Clone this repo :

-   ```bash
    git clone https://github.com/MikeLvl76/Hangman.git
    ```

Install packages :

-   ```bash
    npm i
    ```

Then run : 

-   ```bash
    npm run dev
    ```
</div>