const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
  },
});

personsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Phone", personsSchema);
