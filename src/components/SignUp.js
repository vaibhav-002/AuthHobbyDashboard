import React, { useState } from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    // Using Local Storage
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    onSignUp();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} className="auth-form">
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
