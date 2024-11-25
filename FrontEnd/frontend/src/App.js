
import './App.css';
import Admin from './components/Admin/Admin';
import Create from './components/User_create/User_create';
import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

import './App.css'
export const UserContext = createContext();
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

        <Route path="/admin" element={<Admin />} />  
        <Route path="/create" element={<Create />} />  
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
