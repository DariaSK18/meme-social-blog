import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faTags,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          MemeSocial
        </Link>
        <nav className="header-nav">
          <Link
            to="/"
            className={`header-nav-link ${isActive("/") ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
          <Link
            to="/categories"
            className={`header-nav-link ${
              isActive("/categories") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faTags} />
            <span>Categories</span>
          </Link>
          {user && (
            <Link
              to="/profile"
              className={`header-nav-link ${
                isActive("/profile") ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="header-right">
        <div className="header-search">
          <FontAwesomeIcon icon={faSearch} className="header-search-icon" />
          <input type="text" placeholder="Search memes..." />
        </div>
        {!user ? (
          <div className="header-auth">
            <Link to="/login" className="header-auth-link">
              Login
            </Link>
            <Link
              to="/register"
              className="header-auth-link header-auth-link--primary"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="header-user">
            <button onClick={logout} className="header-logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
