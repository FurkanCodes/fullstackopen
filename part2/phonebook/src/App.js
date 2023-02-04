import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  };

  useEffect(hook, []);
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

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
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
      <Filter
        handleChangeFilter={handleChangeFilter}
        handleSearchSubmit={handleSearchSubmit}
        searchInput={searchInput}
      />
      <h2>Add new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        handleChangeName={handleChangeName}
        newName={newName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchInput={searchInput} />
    </div>
  );
};

export default App;
