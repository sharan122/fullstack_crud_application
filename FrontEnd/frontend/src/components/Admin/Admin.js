// src/AdminPage.js
import React, { useState ,useEffect, useContext } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Admin = () => {
    const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {user,setUser} = useContext(UserContext)
  useEffect(() => {
    // if (!auth.isAuthenticated || !auth.is_active) {
    //   navigate('/login');
    // }
    if(user.is_staff===false){
      navigate('/')
    }
},[user])
    // if (user.accessToken) {

    //   const validate = async () =>{
    //     const res = await validateToken(user.accessToken)
    //     if (res === 200) {
    //       console.log('Token is valid');
         
    //     }
    //   else {
    //     dispatch(logout());
    //     persistor.purge();
    //     navigate('/login');
    //   }
    // }
    //   validate()
    // }
//   }, [auth.isAuthenticated, auth.is_active, auth.is_staff, navigate]);
  useEffect (() => {
    async function fetchdata(){
      console.log('dfd');
      const userList = await axios.get('http://127.0.0.1:8000/users-list')
      console.log(userList.data);
      setUsers(userList.data)
    }
    fetchdata()
    }, [])
  

  const toggleActiveStatus = async (userId) => {
    await axios.get(`http://127.0.0.1:8000/block,${userId}`);
    const userList = await axios.get('http://127.0.0.1:8000/users-list');
    // console.log(userList.data);
    setUsers(userList.data)
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://127.0.0.1:8000/delete-user,${userId}`)
    
    const userList = await axios.get('http://127.0.0.1:8000/users-list');
 
    // console.log(userList.data);
    setUsers(userList.data)
  };
  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/logout');
    navigate('/login'); 
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>User Management</h1>

      <div className="admin-header">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button className="logout" onClick={handleLogout}>Log Out</button>
        <button className="add-user-button" onClick={()=>navigate('/Create')}>Add User</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => toggleActiveStatus(user.id)}
                  className={user.is_active ? 'active-button' : 'inactive-button'}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
