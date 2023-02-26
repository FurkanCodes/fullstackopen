const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("provide arguments as <password> <name> <number>");
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log("provide maximum of 3 arguments as <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://vft:${password}@cluster0.upvwsnk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model("Phone", phoneSchema);

const phone = new Phone({
  name,
  number,
});

process.argv.length > 3
  ? phone.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
  : Phone.find({}).then((person) => {
      console.log("phonebook:");
      person.forEach((indPerson) => {
        console.log(`${indPerson.name} ${indPerson.number}`);
      });
      mongoose.connection.close();
    });
