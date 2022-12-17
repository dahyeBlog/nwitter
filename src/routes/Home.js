import React, { useState, useEffect } from "react";
import db, { storagaService } from "../fBase";
import {getDownloadURL, ref, uploadString} from 'firebase/storage'
import { v4 } from "uuid";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Nweet from "../components/Nweet";
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    const q = query(collection(db, "nweets"), orderBy("createAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);
  
  const onChange = (event) => {
    setNweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = ""
    if (attachment !== "") {
      const attachmentRef = ref(storagaService, `${userObj.uid}/${v4()}`)
      await uploadString(attachmentRef, attachment, 'data_url')
      attachmentUrl = await getDownloadURL(ref(storagaService, attachmentRef))
    }
    console.log(attachmentUrl);
    
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }

    await addDoc(collection(db, "nweets"),  nweetObj);
    setNweet("");
    setAttachment("")
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
    setAttachment(null)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          maxLength={120}
          onChange={onChange}
          placeholder="What's on your mind?"
          value={nweet}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
