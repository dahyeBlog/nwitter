import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import db from "../fBase";
import { storagaService } from "../fBase";
import { ref } from "firebase/storage";
import { deleteObject } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(db, "nweets", nweetObj.id));
      await deleteObject(ref(storagaService, nweetObj.attachmentUrl))
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "nweets", nweetObj.id), {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    setNewNweet(event.target.value);
  };

  console.log(nweetObj);
  
  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <div>
          <div key={nweetObj.id}>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
              <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="" />
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Nweet;
