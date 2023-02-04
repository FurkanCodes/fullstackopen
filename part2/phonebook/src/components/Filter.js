import React from "react";

function Filter({ handleChangeFilter, handleSearchSubmit, searchInput }) {
  return (
    <div>
      {" "}
      <form onSubmit={handleSearchSubmit}>
        search:{" "}
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChangeFilter}
          value={searchInput}
        />
      </form>
    </div>
  );
}

export default Filter;
