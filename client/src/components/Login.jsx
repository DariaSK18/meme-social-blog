import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { apiFetch } from "../axiosapi";
import "../styles/Login.css";


// !!!!!!!!!!!! TEST for mock
const defaultUser = {
  email: "anna@anna.com",
  password: "anna1",
};


export default function Login() {
  const navigate = useNavigate();
  const { login } = useSession();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

async function handleSubmit(e) {
  e.preventDefault();
  setError("");

   // mock login check
if (
    form.email === defaultUser.email &&
    form.password === defaultUser.password
  ) {
    // fake token + user data
    login(
      { email: defaultUser.email },
      "mock-token-123"
    );

    navigate("/");

  } else {
    setError("Login failed.");
  }
}

    return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-logo-box">
          <span>M</span>
        </div>

        <h2 className="login-brand">MemeSocialBlog</h2>

        {error && <p className="error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="login-btn" type="submit">
            Login
          </button>

        {/* Forgotten Password */}
          <button
          type="button"
          className="auth-link-btn"
          onClick={() => navigate("/forgot-password")}>
          Forgot your password?
          </button>

        </form>

        {/* Register section under Forgotten Password */}
        <div className="register-section">
          <span className="no-account-text">Don't have an account?</span>
          <button
            className="register-btn"
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
}