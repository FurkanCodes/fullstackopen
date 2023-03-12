const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogsRouter = require("./controller/blogs");
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB_URI;

mongoose.connect(MONGODB).then(() => {
  console.log("connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
