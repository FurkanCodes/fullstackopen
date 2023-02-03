import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "FUrkan TUrko" },
  ]);
  const [newName, setNewName] = useState("");

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPersonObj = {
      name: newName,
    };
    setPersons(persons.concat(newPersonObj));
    setNewName("");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
