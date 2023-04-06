import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notifications from "./components/Notifications";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogLoggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogLoggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.message + " " + "User name or password is wrong");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    setMessage("WELCOME");
  };

  const createBlog = async (e) => {
    e.preventDefault();
    const newBlobObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    const newBlog = await blogService.create(newBlobObj);
    setBlogs(blogs.concat(newBlog));

    setMessage("a blog added");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    console.log(newTitle, newAuthor);
  };

  const logOut = () => {
    window.localStorage.removeItem("blogLoggedUser");
    setUser(null);
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        username
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </div>
    </form>
  );

  const blogForm = () => (
    <div>
      <form onSubmit={createBlog}>
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

  return (
    <div>
      <h2>Login</h2>
      <Notifications message={message} />
      {!user && loginForm()}
      {user && (
        <div>
          {user.username} logged in
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
