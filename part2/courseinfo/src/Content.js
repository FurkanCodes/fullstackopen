import React from "react";
import Part from "./Part";

function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
}

export default Content;
