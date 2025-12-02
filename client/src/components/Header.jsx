import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <h1>Header</h1>
      <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/categories">Categories</Link> |
    </>
  );
}
