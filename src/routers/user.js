const express = require("express");
const User = require("../models/user");

const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/users/signup", async (req, res) => {
  const user = new User({ ...req.body });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user: await user.getPublicProfile(), token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.json({ user: await user.getPublicProfile(), token });
  } catch (e) {
    res.status(404).send();
  }
});

//logout All
router.post("/user/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
