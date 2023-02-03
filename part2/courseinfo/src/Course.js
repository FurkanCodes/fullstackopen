import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ course }) {
  const { parts, name } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default Course;
