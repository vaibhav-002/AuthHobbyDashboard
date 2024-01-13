import React, { useState } from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Using Local Storage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      userData &&
      userData.email === email &&
      userData.password === password
    ) {
      onLogin();
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <div className="container">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div>
            <button type="submit">Login</button>
            <button onClick={handleSignUp}>SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
