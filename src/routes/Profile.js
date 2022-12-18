import React, { useState } from "react";
import db, { auth } from "../fBase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display name"
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>{" "}
    </div>
  );
};

export default Profile;
