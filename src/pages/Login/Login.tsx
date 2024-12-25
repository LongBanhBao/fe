import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      setError("Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <div className="login-links">
          <a href="/register" className="login-link">
            Đăng kí
          </a>
          <a href="/forgot-password" className="login-link">
            Quên mật khẩu
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
