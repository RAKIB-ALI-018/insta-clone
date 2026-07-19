//* sirf UI ke liye code likhenge
//* backend se connect karne ke liye auth.api.js file mein code likhenge

import React from 'react'
import "../styles/register.scss"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e){
    e.preventDefault();   
  }

  return (
    <main className='register-page'>
      <h1>Register</h1>

      <form onSubmit={submitHandler}>
        <input
        value={username}
        onInput={(e)=>setUsername(e.target.value)}
        type="text" placeholder='Enter username' />

        <input
        value={email}
        onInput={(e)=>setEmail(e.target.value)}
        type="text" placeholder='Enter email' />

        <input
        value={password}
        onInput={(e)=>setPassword(e.target.value)}
        type="text" placeholder='Enter password' />
        <button>Register</button>
      </form>
      <p className='login-text'>
        Already have an account?{' '}
        <span className='login-link' onClick={() => navigate('/login')}>
          Log in
        </span>
      </p>


    </main>
  );
}

export default Register;
