import UserAvatar from "../assets/userprofile.png"

export default function UserProfile({ user, isOwnProfile, onClose }) {
 
 
return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <div className="profile-close" onClick={onClose}>✕</div>

        <img
          className="profile-avatar"
          src= {UserAvatar}
          alt= "profile_picture"
        />

        <div className="profile-header">
          <h2>{user.username}</h2>
          <p>{user.name}</p>
        </div>

        <div className="profile-stats">
          <div>Following: {user.followingCount}</div>
          <div>Followers: {user.followersCount}</div>
          <div>Posts: {user.postCount}</div>
        </div>

        {isOwnProfile && (
          <div className="profile-actions">
            <button>Change password</button>
            <button>Logout</button>
            <button className="delete-btn">Delete profile</button>
          </div>
        )}
      </div>
    </div>
  );
}
