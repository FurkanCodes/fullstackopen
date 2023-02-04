import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const addNewPerson = (e) => {
    e.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return false;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPersonObj));
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleChangeFilter = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSearchSubmit}>
        search:{" "}
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChangeFilter}
          value={searchInput}
        />
      </form>

      <h2>Add new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleChange} value={newName} />
          <div>
            number: <input onChange={handleChangeNumber} value={newNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchInput))
        .map((person) => (
          <ol key={person.name}>
            NAME: {person.name}
            <br />
            NUMBER: {person.number}
            <br />
            ID: {person.id}
          </ol>
        ))}
    </div>
  );
};

export default App;
