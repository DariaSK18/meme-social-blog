import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { FiHome, FiUser, FiMail, FiLogOut } from "react-icons/fi";
import "../styles/Header.css";

import Logo from "./Logo";



export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const [q, setQ] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!q.trim()) return;
        navigate(`/search?q=${encodeURIComponent(q)}`);

    };


  return (
    <header className="header">

      {/* Left - Logo */}
      <div className="header-left" onClick={() => navigate("/")}>
        <Logo />
      </div>

      {/* Center - Search */}
      <form className="header-search" onSubmit={handleSearch}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search memes..."
        />
      </form>

      {/* Right side */}
      <div className="header-right">

        <FiHome
          className="nav-icon"
          title="Home"
          onClick={() => navigate("/")}
        />


        {user ? (
          <>
  {/*!!!!!!!!!!! Messages - notifications? */}         
            <FiMail
              className="nav-icon"
              title="Messages"
              onClick={() => navigate("/")}
            />

            {/* Profile */}
            <FiUser
              className="nav-icon"
              title="Profile"
              onClick={() => navigate(`/profile/${user.id || "me"}`)}
            />

            {/* Logout */}
            <FiLogOut
              className="nav-icon danger"
              title="Log out"
              onClick={logout}
            />
          </>
        ) : (
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
