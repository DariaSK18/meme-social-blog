import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout, getMe } from "../api/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import "../styles/profile.css";

export default function Profile() {
  const { logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getMe();

        if (res?.data?.user) setProfileData(res.data.user);
        else if (res?.data) setProfileData(res.data);
        else setProfileData(null);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  if (!profileData) return <p>Loading...</p>;

  const handleLogout = async () => {
    try {
      await apiLogout();
    } finally {
      logout();
      navigate("/");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/me`, {
        method: "DELETE",
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
      {profileData.avatar ? (
        <img src={profileData.avatar} alt="Profile" className="profile-image" />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}

      <h2>{profileData.username}</h2>
      <p>Email: {profileData.email}</p>
      <div className="profile-stats">
        <div className="profile-stat-item">
          <span className="profile-stat-value">
            {profileData.followingCount || 0}
          </span>
          <span className="profile-stat-label">Following</span>
        </div>

        <div className="profile-stat-item">
          <span className="profile-stat-value">
            {profileData.followersCount || 0}
          </span>
          <span className="profile-stat-label">Followers</span>
        </div>

        <div className="profile-stat-item">
          <span className="profile-stat-value">
            {profileData.memesCount || 0}
          </span>
          <span className="profile-stat-label">Posts</span>
        </div>
      </div>

      <div className="profile-actions">
        <Button
          text={"Change Password"}
          to={"/change-password"}
          className="profile-logout-btn profile-btn"
        />

        <Button
          text={"Logout"}
          onClick={handleLogout}
          className="profile-logout-btn profile-btn"
        />

        <Button
          text={"Delete Profile"}
          onClick={handleDelete}
          className="profile-delete-btn profile-btn"
        />
      </div>
    </div>
  );
}
