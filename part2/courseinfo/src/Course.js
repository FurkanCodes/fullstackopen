import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ course, parts }) {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total course={course} />
    </div>
  );
}

export default Course;
