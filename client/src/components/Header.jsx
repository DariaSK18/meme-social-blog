import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <Link to="/">MemeSocial</Link>
      <input type="text" placeholder="Search" />

      {!user ? (
        <div>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
      ) : (
        <div>
          <Link to="/profile">profile</Link>
          <button onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
