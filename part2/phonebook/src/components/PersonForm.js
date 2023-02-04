import React from "react";

function PersonForm({
  addNewPerson,
  handleChangeName,
  newName,
  handleChangeNumber,
  newNumber,
}) {
  return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleChangeName} value={newName} />
          <div>
            number: <input onChange={handleChangeNumber} value={newNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
