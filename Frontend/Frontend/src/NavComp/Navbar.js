import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import logo from './Athletrix.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role")); // Initialize from localStorage

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (userRole) => {
    localStorage.setItem("role", userRole); // Set role in localStorage
    setRole(userRole); // Immediately update the state in Navbar
  };  

  // Listen for changes to localStorage and update the state
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Button rendering based on role
  const renderNavbarButtons = () => {
    if (role === 'athlete') {
      return (
        <>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/diet-plan">Diet Plan</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/events/results/athlete">Results</Link></li>
          <li><Link to="/user-profile">Athlete Profile</Link></li>
        </>
      );
    } else if (role === 'coach') {
      return (
        <>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/diet-plan">Diet Plan</Link></li>
          <li><Link to="/coach/events">Events</Link></li>
          <li><Link to="/events/results/coach">Results</Link></li>
          <li><Link to="/coach-dashboard">Coaches</Link></li>
          <li><Link to="/coach-profile">Profile</Link></li>
        </>
      );
    } else if (role === 'admin') {
      return (
        <>
        <li><Link to="/events/results">Results</Link></li>
        <li><Link to="/api/admin">Admin Dashboard</Link></li>
        <li><Link to="/events/registrations">Registrations</Link></li>
        </>
      );
    } else {
      // For guest/unauthenticated users, show only News
      return (
        <li><Link to="/news">News</Link></li>
      );
    }
  };

  return (
    <nav>
      <div className="navbar-title">
      <Link to="/">
          <img src={logo} alt="Athletrix" className="logo" />
        </Link>
      </div>
      <div className="hamburger" onClick={toggleNavbar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
        {renderNavbarButtons()}
      </ul>
    </nav>
  );
};


export default Navbar;
