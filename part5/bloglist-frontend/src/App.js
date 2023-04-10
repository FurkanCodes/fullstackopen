import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));

    setMessage("a blog added");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const logOut = () => {
    window.localStorage.removeItem("blogLoggedUser");
    setUser(null);
  };

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    );
  };

  const blogForm = () => (
    <div>
      <Togglable buttonLabel={" new blog"}>
        <BlogForm createBlog={addBlog} logOut={logOut} />
      </Togglable>
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
