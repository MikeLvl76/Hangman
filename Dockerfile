FROM node:latest

WORKDIR /hangman

COPY . .

RUN npm install

CMD npm run dev

EXPOSE 5173
EXPOSE 5174
EXPOSE 8080
