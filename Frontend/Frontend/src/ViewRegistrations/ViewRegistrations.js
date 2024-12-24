import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ViewRegistrations.css';

function ViewRegistrations() {
  const { eventId } = useParams(); // Destructure eventId from the route params
  const [registrationData, setRegistrationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Authorization token is missing');
      return;
    }

    fetch(`http://localhost:8080/api/admin/registrations/${eventId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched registrations:', data);
        setRegistrationData(Array.isArray(data) ? data : data.registrations || []);
      })
      .catch((error) => {
        console.error('Error fetching registrations:', error);
      });
  }, [eventId]);

  const handleStatusChange = (athleteId, action) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Authorization token is missing');
      return;
    }

    const endpoint = `http://localhost:8080/api/admin/registration/${eventId}/${action}/${athleteId}`;
    
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to ${action} registration`);
        }
        return response.text();
      })
      .then((message) => {
        console.log(message);
        // Optionally update the UI based on the action
        setRegistrationData((prevData) =>
          prevData.map((registration) =>
            registration.athleteId === athleteId
              ? { ...registration, status: action === "approve" ? "approve" : "reject" }
              : registration
          )
        );
      })
      .catch((error) => {
        console.error('Error updating registration status:', error);
      });
  };

  const filteredRegistrations = Array.isArray(registrationData)
    ? registrationData.filter((registration) =>
        registration.athleteUsername.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="view-registrations">
      <div className="header">
        <Link to="/events/registrations">
          <button className="back-button123">
            <ArrowLeft className="arrow-icon" />
          </button>
        </Link>
        <h1>View Registrations</h1>
      </div>
      <div className="registrations-container">
        <input
          type="text"
          placeholder="Search by athlete username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Athlete ID</th>
              <th>Athlete Username</th>
              <th>Event ID</th>
              <th>Event Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((registration) => (
              <tr key={registration.athleteId}>
                <td>{registration.athleteId}</td>
                <td>{registration.athleteUsername}</td>
                <td>{registration.eventId}</td>
                <td>{registration.eventTitle}</td>
                <td>
                  <select
                    className="status-dropdown"
                    value={registration.status || "pending"} // Use the status from the backend
                    onChange={(e) =>
                      handleStatusChange(registration.athleteId, e.target.value)
                    }
                  >
                    <option value="pending">Select</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ViewRegistrations;
