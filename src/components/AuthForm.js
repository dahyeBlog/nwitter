import React, {useState} from 'react'
import { auth } from "../fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthForm = () => {
  
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
  }
  const toggleAccount = () => {
    setNewAccount((prev) => !prev)
  }
  

  return (
    <>
       <form onSubmit={onSubmit} className='authForm'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className='authInput'
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className='authInput'
        />
        <input type="submit" className='authSubmit' value={ newAccount ? 'Create Account' : 'Sign In' } />
        {error && <span className="authError">{error}</span>}

      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "Sign In" : "Create Account"}
      </span> 
    </>
  )
}

export default AuthForm
