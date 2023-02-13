const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
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
  response.json(persons);
});
//fetches a person based on ID
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404);
    response
      .send(
        `error 404 <br />
       Could not find the person with the id of ${id}`
      )
      .end();
  }
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
