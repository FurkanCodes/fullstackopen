const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  if (!username || !password) {
    return res.status(400).json({
      error: "password or username missing",
    });
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: "password is shorter than 3",
    });
  }
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    username: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
});

module.exports = usersRouter;
