//* sirf UI ke liye code likhenge
//* backend se connect karne ke liye auth.api.js file mein code likhenge

import React from 'react';
import { useNavigate } from 'react-router-dom'
import "../styles/form.scss"
import {useState} from 'react'
import {useAuth} from "../hook/useAuth"

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {handleLogin, loading} = useAuth()

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    async function submitHandler(e){
        e.preventDefault()

        handleLogin(username, password)
        .then(res=>{
            console.log(res);
            navigate("/home")
            
        })
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

                    <form onSubmit={submitHandler}>
                        <input
                        value={username}
                        onInput={(e)=>setUsername(e.target.value)}
                        className='input-data' type="text" placeholder='Username or email' />

                        <input
                        value={password}
                        onInput={(e)=>setPassword(e.target.value)}
                        className='input-data' type="text" placeholder='Password' />

                        <button>Log in</button>
                    </form>

                    <button className='register-button' onClick={() => navigate('/register')}>
                        Create new account
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Login;