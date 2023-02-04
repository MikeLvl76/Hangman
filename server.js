const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoHost = 'URL_MONGO' in process.env ? process.env.URL_MONGO : process.env.MONGO_URI;
const mongoDB = 'DB_MONGO' in process.env ? process.env.DB_MONGO : process.env.MONGO_DB_NAME;
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/index"));

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Now browsing on http://localhost:${process.env.EXPRESS_PORT}/`);
});

mongoose
  .connect(`${mongoHost}/${mongoDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err))
  .finally(console.log("Database connected !"));

module.exports = app;
