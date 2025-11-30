import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
// The same ui as login
import "../styles/Login.css";
import Logo from "../components/Logo";

export default function ForgotPasswordPage() {

    const { user } = useSession();
    const navigate = useNavigate();

    // If user is logged in naviagte to home 
  if (user) {
    navigate("/");
    return null;
  }

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("If an account exists, a reset link has been sent.");
  };


  return (

  <div className="login-wrapper">
      <div className="login-card">

        {/* Logo box */}
        <div className="login-logo-box">
          <Logo />
        </div>

        <h2 className="login-brand">MemeSocialBlog</h2>
        <h3 className="login-title">Recover Password</h3>

        {message && <p className="info">{message}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Send Reset Link
          </button>
        </form>

        <div className="register-section">
          <span className="no-account-text">Remember your password?</span>
          <button className="register-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
}