import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import './LandingPage.css';  // External CSS for styling
import logo from './Athletrix.png';

const LandingPage = () => {
  const navigate = useNavigate();

  // Initialize state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on page load
  useEffect(() => {
    // Check localStorage for login status
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Perform login logic here
    localStorage.setItem('isLoggedIn', 'true');  // Save login status
    setIsLoggedIn(true);  // Update state
    navigate('/login');   // Navigate to login page
  };

  const handleSignUp = () => {
    // Perform sign-up logic here
    localStorage.setItem('isLoggedIn', 'true');  // Save login status
    setIsLoggedIn(true);  // Update state
    navigate('/signup');  // Navigate to sign-up page
  };

  const handleLogout = () => {
    // Clear everything from localStorage
    localStorage.clear();

    // Update the state to reflect logout if needed
    setIsLoggedIn(false);

    // Redirect to home or landing page and refresh
    navigate('/');
    window.location.reload(); // Refresh the page to reflect the change
  };


  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
              <h1>
          <img src={logo} alt="Athletrix" className="logo12" />
              </h1>
            <h2>
              Where Performance Meets
              <TypeAnimation
                sequence={[
                  'Passion',
                  2000,
                  'Dedication',
                  2000,
                  'Excellence',
                  2000,
                  'Teamwork',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                style={{
                  display: 'inline-block',
                  color: 'rgb(255, 87, 87)',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  marginLeft: '8px'
                }}
                repeat={Infinity}
              />
            </h2>
            <h3>Unleash your potential and make your mark in the sporting arena.</h3>
          </div>
          <div className="cta-buttons">
            {/* Conditionally render buttons based on login status */}
            {!isLoggedIn ? (
              <>
                <button onClick={handleLogin} className="cta-btn">Login</button>
                <button onClick={handleSignUp} className="cta-btn">Sign Up</button>
              </>
            ) : (
              <button onClick={handleLogout} className="cta-btn">Logout</button>
            )}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>What You Can Do</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Create Profiles</h3>
            <p>Athletes and Coaches can create and manage their personal profiles with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Register for Events</h3>
            <p>View and register for available sports events with just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>Track Your Progress</h3>
            <p>See the events you've registered for and track your performance.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 ATHLETRIX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;