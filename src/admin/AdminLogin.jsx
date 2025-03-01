import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true"); // Store auth status
      localStorage.setItem("isGuest", "false");
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  const handleContinueWithoutLogin = () => {
    localStorage.setItem("isGuest", "true");
    localStorage.setItem("isAuthenticated", "false");
    navigate("/home");
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button onClick={handleContinueWithoutLogin}>Continue Without Login</button>
    </div>
  );
};

export default AdminLogin;
