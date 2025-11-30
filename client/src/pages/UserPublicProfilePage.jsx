import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { apiGet } from "../axiosapi";
import UserProfile from "../components/UserProfile.jsx";
import UserAvatar from "../assets/userprofile.png"
import "../styles/UserProfile.css";


//!!!!!!!! temp mock:
const mockUsers = {
  1: { id: 1, email: "alice@anna.com", name: "Alice Jane", avatar: {UserAvatar}, followersCount: 10, followingCount: 4, postCount: 7 },
  2: { id: 2, email: "bob@anna.com", name: "Bob Smith", avatar: {UserAvatar}, followersCount: 2, followingCount: 9, postCount: 1 },
  3: { id: 3, email: "anna@anna.com", name: "anna", avatar: {UserAvatar}, followersCount: 2, followingCount: 9, postCount: 1 },
}


export default function UserPublicProfilePage() {
  const { id } = useParams();
  const user = mockUsers[id];

  if (!user) return <div>User not found</div>;

  return <UserProfile user={user} isOwnProfile={false} />;
}
