// shared/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./navbar.scss";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <img src="/Instagram_icon.png" alt="Instagram" />
                <h1>Instagram</h1>
            </div>

            <div className='navbar-right'>
                <button className='create-btn' onClick={() => navigate('/create')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Create</span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;