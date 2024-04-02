/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginOrLogOut = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("/check-login");
      setIsLoggedIn(response.data.isLoggedIn);
      setUsername(response.data.username || "");
    } catch (error) {
      console.error("Check login status error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        email,
        password,
      });

      const { token, username: loggedInUsername } = response.data;

      document.cookie = `token=${token}; path=/`;

      setIsLoggedIn(true);
      setUsername(loggedInUsername);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      console.log(document.cookie);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>
            Welcome, {username}!
          </h2>
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          {error && (
            <p>{error}</p>
          )}
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginOrLogOut;
