import React, { useState } from "react";
import db, { auth } from "../fBase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
const Profile = ({ userObj ,refreshUser }) => {
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
      refreshUser()
    }
  };
  
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
