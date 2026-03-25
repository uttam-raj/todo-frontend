import React, { useEffect, useState } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Store/userContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Profile = () => {
  const {user,setUser} = useUser();
  const [profilePic, setProfilePic] = useState(user?.profileImage || "/default-profile.png");
  const [editingField, setEditingField] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/api/settings/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          if (data.user.profileImage) setProfilePic(data.user.profileImage);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [token]);

  // Save updated field
  const handleEdit = async (field, value) => {
    try {
      const res = await fetch(`${API}/api/settings/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        if (field === "profileImage") setProfilePic(value);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
    setEditingField(null);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEdit("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      const res = await fetch(`${API}/api/settings/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Account deleted");
        localStorage.removeItem("token");
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error deleting account:", err);
    }
    setShowDeleteConfirm(false);
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-left">
          <div className="profile-pic-container">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="overlay">
              <label htmlFor="file-upload" className="upload-btn">
                Change Photo
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        <div className="profile-center">
          <h2 className="username">{user.name}</h2>
           <p className="leet-id">ADMIN:UTTAM KUMAR RAJWAR </p>   
        </div>
      </div>

      {/* Info Card */}
      <div className="info-card">
        <h3>Basic Info</h3>
        <table>
          <tbody>
            {["name", "gender", "email", "phone"].map((field) => (
              <tr key={field}>
                <td className="label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </td>
                <td className="value">
                  {editingField === field ? (
                    <input
                      type="text"
                      defaultValue={user[field] || ""}
                      onBlur={(e) => handleEdit(field, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    user[field] || "Not provided"
                  )}
                </td>
                <td className="actions">
                  <span
                    className="edit-btn"
                    onClick={() => setEditingField(field)}
                  >
                    Edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={() => setShowDeleteConfirm(true)}
      >
        Delete Account
      </button>

      {/* Confirm Box */}
      {showDeleteConfirm && (
        <div className="confirm-box">
          <p>Are you sure you want to delete this account?</p>
          <button onClick={deleteAccount}>Yes, Delete</button>
          <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
