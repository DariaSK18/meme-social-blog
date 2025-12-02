import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <h1>Footer</h1>
      <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/categories">Categories</Link>
    </>
  );
}
