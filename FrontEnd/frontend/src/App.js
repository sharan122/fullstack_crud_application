import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

import './App.css'

export const UserContext = createContext();  // Create a context for user data and JWT

function App() {
  // Set up state for user data and JWT token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Handle user login
  const handleLogin = (userData, jwtToken) => {
    setUser(userData);  // Save user data
    setToken(jwtToken);  // Save the JWT token
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  const contextValue = {
    user,
    token,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <UserContext.Provider value={contextValue}> 
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />  
        <Route path="/" element={<Login />} />  
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </UserContext.Provider>
  );
}

const Home = () => {
  return <h1>Welcome to the Home Page</h1>;
};

export default App;
