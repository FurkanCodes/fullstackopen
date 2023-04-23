import React, { useState } from "react";

const Blog = ({ blog, updateLikes, deletePost }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    updateLikes(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <ol>
        <li>
          <p> Title </p>
        </li>
        <h2>{blog.title}</h2>
        <div style={showWhenVisible}>
          <li>
            <p> Author </p>
          </li>
          <h2>{blog.author}</h2>
          <li>
            <p> Likes </p>
          </li>
          <h2>{blog.likes}</h2>
          <button onClick={handleLike}> add like</button>
          <button onClick={() => deletePost(blog.id)}> delete</button>
        </div>
      </ol>
      {visible ? (
        <button onClick={toggleVisibility}>hide details</button>
      ) : (
        <button onClick={toggleVisibility}>view details</button>
      )}
    </div>
  );
};

export default Blog;
