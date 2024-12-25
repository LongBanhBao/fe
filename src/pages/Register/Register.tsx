import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("student");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'teacher' && !email.endsWith('@lecturer.com')) {
      setError('Email của giáo viên phải có định dạng @lecturer.com');
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Đăng ký thất bại");
        return;
      }

      window.location.href = "/login";
    } catch (error) {
      setError("Đăng ký thất bại");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Đăng ký</h2>
        <form onSubmit={handleRegister}>
          <div className="register-role">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Học sinh
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === "teacher"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Giáo viên
            </label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="register-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="register-input"
            required
          />
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
        {error && <p className="register-error">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
