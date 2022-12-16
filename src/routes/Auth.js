import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth ,app } from "../fBase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev)
  }

  const onSocialClick = async (event) => {
    const {target:{name}} = event
    let provider;
    if(name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(auth, provider)
    console.log(data);
  
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    try {
      let data;
      if(newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data);
      
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
    
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={ newAccount ? 'Create Account' : 'Sign In' } />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
