import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import "../styles/Login.css"; 
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const { changePassword } = useAuth(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setAlert({ type: "success", message: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Failed to change password" });
    }
  };

  return (
    <div className="login-container">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          fixed
        />
      )}
      <div className="login-box">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}
