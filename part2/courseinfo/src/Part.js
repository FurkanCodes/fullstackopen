import React from "react";

function Part({ name, exercises }) {
  return (
    <div>
      {" "}
      <p>
        {name} {exercises}
      </p>
    </div>
  );
}

export default Part;
