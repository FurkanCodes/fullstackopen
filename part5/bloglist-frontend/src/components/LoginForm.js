import React from "react";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
        username
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default LoginForm;
