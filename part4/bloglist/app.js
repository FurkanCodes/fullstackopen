const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controller/blogs");

const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const { MONGODB } = require("./utils/config");

mongoose
  .connect(MONGODB)
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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
