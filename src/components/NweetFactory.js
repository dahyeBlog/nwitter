import React, { useState } from "react";
import db, { storagaService } from "../fBase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onChange = (event) => {
    setNweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storagaService, `${userObj.uid}/${v4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(ref(storagaService, attachmentRef));
    }
    console.log(attachmentUrl);

    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(db, "nweets"), nweetObj);
    setNweet("");
    setAttachment("");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          maxLength={120}
          onChange={onChange}
          placeholder="What's on your mind?"
          value={nweet}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input type="file" accept="image/*" onChange={onFileChange} />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>{" "}
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
