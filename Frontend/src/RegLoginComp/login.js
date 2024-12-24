import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Link } from 'react-router-dom';
import './RegLogin.css';
import InputPassword from './inputPassword';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    role: '',  // This will be set after a successful login, based on the response
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (password) => {
    setLoginData((prevData) => ({
      ...prevData,
      password: password,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("role");
  
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("authToken", token);
        const role = data.role;
        localStorage.setItem("role", role);
  
        // Redirect user based on their role
        if (role === 'athlete') {
          navigate('/');
        } else if (role === 'coach') {
          navigate('/coach-dashboard');
        } else if (role === 'admin') {
          navigate('/api/admin');
        } else {
          setErrorMessage('Role is not recognized. Redirect failed.');
        }
  
        // Refresh the page
        window.location.reload();
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };

  
  return (
    <div className="login-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div>
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputPassword onPasswordChange={handlePasswordChange} isLogin={true} />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <p>
          New user? <Link to="/signup">Register Here!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
