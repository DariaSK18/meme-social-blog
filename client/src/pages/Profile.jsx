import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../api/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        console.log(data);

        setProfileData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProfile();
  }, [user]);

  if (!profileData) return <p>Loading...</p>;

  const handleLogout = async () => {
    await apiLogout();
    logout();
    navigate("/");
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/me`, {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete profile");
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile">
      {/* <img
        src={profileData.avatar}
        alt="image"
        className="profile__image"
      />  */}
      <FontAwesomeIcon icon={faUser} />
      <h2>{profileData.data.username}</h2>
      <p>Email: {profileData.data.email}</p>
      <p>Following: {profileData.data.followingCount || 0}</p>
      <p>Followers: {profileData.data.followersCount || 0}</p>
      <p>Posts: {profileData.data.memesCount || 0}</p>

      <div className="profile__actions">
        <Button
          text={"Change Password"}
          to={"/change-password"}
          className="profile__logout-btn profile-btn"
        ></Button>
        <Button
          text={"Logout"}
          onClick={handleLogout}
          className="profile__logout-btn profile-btn"
        ></Button>
        <Button
          text={"Delete Profile"}
          onClick={handleDelete}
          className="profile__delete-btn profile-btn"
        ></Button>
      </div>
    </div>
  );
}
