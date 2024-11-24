import React, { useContext } from 'react';
import { UserContext } from '../App';  

const Home = () => {
  const { user } = useContext(UserContext);  

  if (!user) {
    return <p>Please log in to see your details.</p>;  
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>  
      <p>Email: {user.email}</p>  
    </div>
  );
};

export default Home;
