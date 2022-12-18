import React, { useState } from "react";
import { auth } from "../fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import AuthForm from "../components/AuthForm";
const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        size="3x"
        style={{ marginBottom: 30 }}
        color={"#04AAFF"}
      />
      <AuthForm />
      <div className="authButtons">
        <button name="google" className="authButton" onClick={onSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle}  />
        </button>
        <button name="github" className="authButton" onClick={onSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub}  />
        </button>
      </div>
    </div>
  );
};

export default Auth;
