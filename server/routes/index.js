const express = require("express");
const Save = require("../models/Save");
const router = express.Router();

// Get all saves
router.get("/", function (req, res, next) {
  Save.find({}).exec((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(
      result.length !== 0
        ? JSON.stringify({ saves: result.map((v) => v.toJSON()) }, null, 4)
        : JSON.stringify({ saves: [] })
    );
  });
});

// Create save
router.post("/create", function (req, res, next) {
  const save = {
    pseudo: req.body.pseudo,
    date: req.body.date,
    word: req.body.word,
    try_count: req.body.try_count,
    correct: req.body.correct,
    wrong: req.body.wrong,
    is_found: req.body.is_found,
    score: req.body.score,
  };
  Save.create(new Save(save), function (err) {
    if (err) {
      return res.status(res.statusCode).send(JSON.stringify({ status: res.statusCode, message: err }));
    }

    res.send(JSON.stringify({ status: res.statusCode, message: 'Success !' }));
  });
});

module.exports = router;
