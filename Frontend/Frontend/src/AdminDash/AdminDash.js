import React, { useEffect, useState } from 'react';
import './AdminDash.css';
import ButtonGroup from './ButtonGroup';

const AdminDash = () => {
  // State to hold the fetched meets data
  const [meets, setMeets] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchMeets = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('authToken'); 
  
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
  
        // Fetch data from the API with Authorization header
        const response = await fetch('http://localhost:8080/api/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in header
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        // Map the response to extract only required fields
        const formattedMeets = data.map((item) => ({
          id: item.eventTitle || 'N/A',
          name: item.meetName || 'N/A',
          category: item.category || 'N/A',
          date: item.eventDate || 'N/A',
          location: item.location || 'N/A',
        }));
  
        setMeets(formattedMeets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchMeets();
  }, []);
  

  return (
    <div className="admin-dashboard">
      <main className="main-content">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
        </div>

        {/* Subheading with Description */}
        <div className="dashboard-subheading">
          <p className="dashboard-description">
            Manage athletic events, participants, and statistics with ease. Stay organized and efficient.
          </p>
          <hr className="decorative-divider" /> {/* Decorative divider line */}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <ButtonGroup />
        </div>

        {/* Meets Table */}
        <div className="meets-table-card">
          <div className="card-header">
            <h2 className="card-title">Created Events</h2>
            <p className="card-description">Overview of all scheduled athletic events.</p>
          </div>
          <div className="card-content">
            <table className="meets-table">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Meet Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {meets.length > 0 ? (
                  meets.map((meet, index) => (
                    <tr key={index}>
                      <td>{meet.id}</td>
                      <td>{meet.name}</td>
                      <td>{meet.category}</td>
                      <td>{meet.date}</td>
                      <td>{meet.location}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No meets available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;
