import { useSession } from "../context/SessionContext";
import UserProfile from "../components/UserProfile";
import "../styles/UserProfile.css";

export default function UserProfilePage() {
  const { user } = useSession();

  if (!user) return <p>Could not load user profile.</p>;

  return <UserProfile user={user} isPublic={false} isOwnProfile={true}/>;
}
