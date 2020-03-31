const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.post("/add", async (req, res) => {
  const user = new User({
    name: req.body.name
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
