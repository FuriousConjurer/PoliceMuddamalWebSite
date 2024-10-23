// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import policeLogo from './mumbai_logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      // If the username and password are correct, navigate to the Dashboard
      navigate('/Dashboard');
    } else {
      // Show an error if login fails
      setError('Invalid username or password');
    }
  };

  // Placeholder for handling the "Forgot Password" link
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add logic for forgotten password here, e.g., navigate to a reset password page
    alert('Redirecting to forgot password page');
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src={policeLogo} alt="Maharastra Police Logo" className="police-logo" />
        <h2>e-Muddamaal<br />Management System</h2>
      </div>
      <div className="right-section">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required // Add required attribute for better UX
            />
            <input
              type="password"
              placeholder="Enter password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Add required attribute for better UX
            />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
            <button type="submit" className="login-button">Login</button>
          </form>
          <button onClick={handleForgotPassword} className="forgot-password" style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
            Forgot <span>Password?</span>
          </button>
          <p>
            Don't have an account? 
            <button onClick={() => alert('Sign up functionality to be implemented')} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
