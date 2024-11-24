// src/AddUser.js
import React, { useState } from 'react';
import './Create.css';
import { useNavigate } from 'react-router-dom';
const Create = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status] = useState('Active');

    const handleSubmit =async (e) => {
        e.preventDefault();

        const res = axios.post('http://127.0.0.1:8000/add-user',{ username, password, email });
        console.log(res);
        
        if (res.status === 201) {
      
            setUsername('');
            setPassword('');
            setEmail('');
            navigate('/admin')
          } else {
            alert(res);
          }
    };

    return (
        <div className="add-user-container">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit} className="add-user-form">
            <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </label>
            <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </label>
            <p>Status: {status}</p> 
            <button type="submit" className="submit-button">Add User</button>
        </form>
        </div>
  );
};

export default Create;
