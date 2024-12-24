import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './UserProfile.css';
import profile from './profile.jpg';
import profilepic from './profilepic.png'
import axios from 'axios'; // Import axios for HTTP requests

const AthleteProfile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeStatus, setActiveStatus] = useState('All');
  const [profileData, setProfileData] = useState(null); // State for profile data
  const [events, setEvents] = useState([]); // State for events
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch athlete profile data from the backend
    const fetchProfileAndEvents = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
        if (!token) {
          alert('No authentication token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/athlete/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setProfileData(response.data);
        setEvents(response.data.registrationRequests); // Set the events data from the response
        setLoading(false);

        // Check if the profile data is incomplete (e.g., required fields are missing)
        if (
          !response.data.firstName ||
          !response.data.lastName ||
          !response.data.birthDate ||
          !response.data.gender ||
          !response.data.height ||
          !response.data.weight ||
          !response.data.category ||
          response.data.photoUrl === null || // Check specifically for null
          response.data.photoUrl === undefined // Check specifically for undefined
        ) {
          alert('You must update your profile before continuing.');
          navigate('/update-profile');
        }
      } catch (err) {
        console.error('Error fetching profile and event data:', err);
        setError('Failed to load profile and event data');
        setLoading(false);
      }
    };

    fetchProfileAndEvents();
  }, [navigate]);

  const tabs = ['Overview', 'Applied Events'];

  const filteredEvents = activeStatus === 'All'
    ? events
    : events.filter(event => event.status.toUpperCase() === activeStatus.toUpperCase());

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if fetching fails
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
        <img src={profileData?.photoUrl?.trim() ? profileData.photoUrl : profilepic} alt="Profile" />
        </div>
        <div className="profile-info">
          {profileData ? (
            <>
              <h1>{profileData.firstName} {profileData.lastName}</h1>
              <div className="profile-details">
                <p>DOB : {profileData.birthDate}</p>
                <p>Gender : {profileData.gender}</p>
                <p>Height : {profileData.height} cm</p>
                <p>Weight : {profileData.weight} kg</p>
                <p>Category : {profileData.category}</p>
              </div>
            </>
          ) : (
            <p>No profile data available.</p>
          )}
          <button className="edit-button" onClick={() => navigate('/update-profile')}>Edit Profile</button> {/* Add edit button */}
        </div>
      </div>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-1 ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="status-tabs">
          {/* Status tabs for filtering events */}
          <button className={`status-tab ${activeStatus === 'All' ? 'active' : ''}`} onClick={() => setActiveStatus('All')}>All Events</button>
          <button className={`status-tab ${activeStatus === 'PENDING' ? 'active' : ''}`} onClick={() => setActiveStatus('PENDING')}>Pending Events</button>
          <button className={`status-tab ${activeStatus === 'APPROVED' ? 'active' : ''}`} onClick={() => setActiveStatus('APPROVED')}>Approved Events</button>
          <button className={`status-tab ${activeStatus === 'REJECTED' ? 'active' : ''}`} onClick={() => setActiveStatus('REJECTED')}>Rejected Events</button>
        </div>
      )}

      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>EVENT ID</th>
              <th>EVENT NAME</th>
              <th>ATHLETE USERNAME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{event.eventTitle}</td>
                  <td>{event.athleteUsername}</td>
                  <td>
                    <span className={`status-badge ${event.status.toLowerCase()}`}>
                      {event.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AthleteProfile;
