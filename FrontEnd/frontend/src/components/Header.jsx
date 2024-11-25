// Header.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    console.log(user,'sd');
    
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
        {user ? <button onClick={()=>navigate('/')} className="btn">Logout</button>:<button onClick={()=>navigate('/signup')} className="btn">Sign Up</button>}
        
      </div>
    </header>
  );
};

export default Header;
