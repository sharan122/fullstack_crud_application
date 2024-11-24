import React, { useContext } from 'react';
import { UserContext } from '../App';  // Import UserContext

const Home = () => {
  const { user } = useContext(UserContext);  // Access user data from context

  // Check if user is logged in
  if (!user) {
    return <p>Please log in to see your details.</p>;  // Show message if user is not logged in
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>  {/* Display user's username */}
      <p>Email: {user.email}</p>  {/* Display user's email */}
      {/* You can add more user details here if necessary */}
    </div>
  );
};

export default Home;
