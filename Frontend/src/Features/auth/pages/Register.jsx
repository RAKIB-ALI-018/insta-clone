import React from 'react'
import "../styles/register.scss"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useAuth } from "../hook/useAuth"

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, handleRegister } = useAuth()

  async function submitHandler(e){
    e.preventDefault();
    setError("")

    try {
      const res = await handleRegister(username, email, password)
      console.log(res);
      navigate("/feed")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.")
    }
  }

  if(loading){
    return(
      <main><h1>Loading...</h1></main>
    )
  }

  return (
    <main className='register-page'>
      <h1>Register</h1>

      <form onSubmit={submitHandler} noValidate>
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
        type="password" placeholder='Enter password' />

        {error && <p className='error-text'>{error}</p>}

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