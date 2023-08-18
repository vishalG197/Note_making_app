import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, username, onLogout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {isLoggedIn ? (
          <>
            <li>Welcome, {username}</li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
