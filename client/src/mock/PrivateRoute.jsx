import { Navigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useSession();

  if (loading) {
    return <p>Loading session...</p>;
  }

  return user ? children : <Navigate to="/login" replace />;
}