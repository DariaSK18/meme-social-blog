import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/categories">Categories</Link>
    </footer>
  );
}
