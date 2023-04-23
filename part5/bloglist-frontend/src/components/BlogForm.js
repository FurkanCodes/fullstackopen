import React, { useState } from "react";

const BlogForm = ({ createBlog, logOut }) => {
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <div>
      {" "}
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
          author
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
          url
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          ></input>
          <button type="submit">post</button>
        </div>
      </form>
      <button onClick={logOut}>log out</button>
    </div>
  );
};

export default BlogForm;
