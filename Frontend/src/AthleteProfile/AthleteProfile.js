import React, { useState, useEffect } from 'react';
import './AthleteProfile.css';
import axios from 'axios';

function AthleteProfile() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the athlete's registrations from the API
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get('http://localhost:8080/api/athlete/myRegistrations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="athlete-profile">
      <div className="profile-header">
        <h2>My Registrations</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : registrations.length > 0 ? (
        <section className="registrations-section">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Athlete Username</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration.eventId}>
                    <td>{registration.eventTitle}</td>
                    <td>{registration.athleteUsername}</td>
                    <td>{registration.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
}

export default AthleteProfile;
