import React from "react";

function Persons({ persons, searchInput, deletePerson }) {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchInput))
        .map((person) => (
          <ol key={person.name}>
            NAME: {person.name}
            <br />
            NUMBER: {person.number}
            <br />
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </ol>
        ))}
    </div>
  );
}

export default Persons;
