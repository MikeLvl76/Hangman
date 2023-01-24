const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');

const indexRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

mongoose
  .connect("mongodb://localhost/hangman", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err))
  .finally(console.log("Database connected !"));

module.exports = app;
