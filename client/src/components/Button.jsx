import { Link } from "react-router-dom";
export default function Button({
  text,
  onClick,
  to,
  type = "button",
  className = "",
}) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {text}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className}>
      {text}
    </button>
  );
}