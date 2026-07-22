import React from 'react';
import { useNavigate } from 'react-router-dom'
import "../styles/form.scss"
import { useState } from 'react'
import { useAuth } from "../hook/useAuth"

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { handleLogin, loading } = useAuth()

    async function submitHandler(e) {
        e.preventDefault()
        setError("")

        try {
            const res = await handleLogin(username, password)
            console.log(res);
            navigate("/feed")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.")
        }
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className='login-page'>
            <div className='left'>
                <div className="left-top">
                    <img src="/Instagram_icon.png" alt="" />
                    <div className='left-top-bottom'>
                        <h2>See everyday moments from your</h2>
                        <h2 className='colored'>close friends.</h2>
                    </div>
                </div>

                <div className="left-bottom">
                    <img src="/instaImg.webp" alt="" />
                </div>
            </div>

            <div className='right'>
                <div className="right-content">
                    <h3>Log into Instagram</h3>

                    <form onSubmit={submitHandler} noValidate>
                        <input
                            value={username}
                            onInput={(e) => setUsername(e.target.value)}
                            className='input-data' type="text" placeholder='Username or email' />

                        <input
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            className='input-data' type="password" placeholder='Password' />

                        {error && <p className='error-text'>{error}</p>}

                        <button>Log in</button>
                    </form>                   

                    <p className='login-text'>
                        Don't have an account?{' '}
                        <span className='login-link' onClick={() => navigate('/register')}>
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;