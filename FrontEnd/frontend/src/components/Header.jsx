// Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
  return (
    <header className="header">
      <div className="logo">MyLogo</div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="cta">
        <button onClick={()=>navigate('/signup')} className="btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
