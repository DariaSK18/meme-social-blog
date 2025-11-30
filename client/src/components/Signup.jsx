import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { apiPost } from "../axiosapi"; 
// The same ui as login
import "../styles/Login.css";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useSession();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }; 
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await apiPost("/api/auth/signup", form);
      login(res.token, res.user);
      navigate("/");
    } catch (err) {
      setError("Signup failed");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Logo Box */}
        <div className="login-logo-box">
          <span>M</span>
        </div>

        <h2 className="login-brand">MemeSocialBlog</h2>
        <h3 className="login-title">Create Your Account</h3>

        {error && <p className="error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <input
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
          />

          <button className="login-btn" type="submit">
            Register
          </button>
        </form>

        {/* Login link */}
        <div className="register-section">
          <span className="no-account-text">Already have an account?</span>
          <button
            className="register-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}