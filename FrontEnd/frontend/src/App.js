import logo from './logo.svg';
import './App.css';
import { useState, createContext } from 'react';
import Admin from './components/Admin/Admin';
import Create from './components/User_create/User_create';
export const UserContext = createContext();
function App() {
  return (
    <UserContext.Provider>
      <Admin/>
      <Create/>
    </UserContext.Provider>
  );
}

export default App;
