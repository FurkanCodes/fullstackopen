import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setTimeout(() => {
        alert("wrong username and password");
      });
    }
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
          name="Pasword"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </div>
    </form>
  );
  const blogForm = () => (
    <form>
      <div>
        title
        <input />
        author
        <input />
        <button>login</button>
      </div>
    </form>
  );
  return (
    <div>
      <h2>Login</h2>

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
