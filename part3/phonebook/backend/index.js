const { request, response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :body"));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(404).json({ error: error.message });
  }

  next(error);
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

//fetches all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

//fetches a person based on ID
app.get("/api/persons/:id", (request, response, next) => {
  const id = Number(request.params.id);
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//deletes a person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
      console.log(`deleted ${request.params.id}`);
    })
    .catch((error) => next(error));
});

// creates a  new phonebook entryu
app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(422).json({
      error: "please input a number and a name ",
    });
  }

  // if (persons.find((person) => person.name === body.name)) {
  //   console.log("name must be unique");
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const utcDate = new Date(Date.now());
  response.send(
    `<p> Phonebook has info for ${
      persons.length
    } people </p> <p> ${utcDate.toUTCString()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
