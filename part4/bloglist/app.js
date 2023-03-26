const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");
require("express-async-errors");
const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const { MONGODB_URI } = require("./utils/config");

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    error("error connecting", err.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
