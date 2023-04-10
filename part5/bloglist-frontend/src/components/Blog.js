import React, { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <ol>
        <li>
          <p> Title </p>
        </li>{" "}
        {blog.title}{" "}
        <div style={showWhenVisible}>
          <li>
            <p> Author </p>
          </li>{" "}
          {blog.author}{" "}
          <li>
            <p> Likes </p>
          </li>{" "}
          {blog.likes}
        </div>
      </ol>
      <button onClick={toggleVisibility}>view details</button>
    </div>
  );
};

export default Blog;
