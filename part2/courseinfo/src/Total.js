import React from "react";

function Total({ parts }) {
  const total = parts.reduce((acc, currentVal) => {
    return acc + currentVal.exercises;
  }, 0);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Number of exercises {total}</p>
    </div>
  );
}

export default Total;
