const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/index"));

console.log(`Now browsing on http://localhost:${process.env.EXPRESS_PORT}/`);

mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err))
  .finally(console.log("Database connected !"));

module.exports = app;
