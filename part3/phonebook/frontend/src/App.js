import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import phoneServices from "./services/services";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");

  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    phoneServices.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const deletePerson = async (id) => {
    const personName = persons.find((person) => person.id === id).name;
    if (window.confirm(`"do you want to delete ${personName}"`)) {
      phoneServices.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const addNewPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      alert(
        `${newName} is already added to phonebook, would you like to replace the number?`
      );
      const changedPerson = { ...existingPerson, number: newNumber };
      const id = existingPerson.id;
      phoneServices
        .updateNumber(id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          setMessage(`${changedPerson.name}'s number has changed!`);
          setNotificationType("success");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(`${error.response.data.error}`);
          setNotificationType("error");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
      return;
    } else {
      const newPersonObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      phoneServices
        .createPerson(newPersonObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));

          setMessage(`${returnedPerson.name} added!`);

          setNotificationType("success");
          setTimeout(() => {
            setMessage(null);
          }, 5000);

          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage(`${error.response.data.error}`);

          setNotificationType("error");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
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
      <Notification notificationType={notificationType} message={message} />

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
      <Persons
        deletePerson={deletePerson}
        persons={persons}
        searchInput={searchInput}
      />
    </div>
  );
};

export default App;
