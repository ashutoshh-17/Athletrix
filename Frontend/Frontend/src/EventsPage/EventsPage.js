import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './EventsPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]); // Use state for fetched events
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const token = localStorage.getItem('authToken'); // Replace with your method of retrieving the token
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch events from the API
  useEffect(() => {
    fetch('http://localhost:8080/api/admin', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in headers
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data); // Set the fetched events
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [token]); // Dependency array to ensure it runs only once or when token changes

  const handleViewRegistrations = (eventId) => {
    console.log(`Fetching registrations for event: ${eventId}`);

    // Make API call using fetch with Authorization header
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
        console.log('Registrations data:', data);
        // Redirect to the view registrations page with the eventId as a route parameter
        navigate(`/events/view-registrations/${eventId}`);
      })
      .catch((error) => {
        console.error('Error fetching registrations:', error);
      });
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="events-page">
      <div className="content">
        <h2>Events</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by meet name or event title"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Title</th>
                <th>Meet Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{event.eventTitle}</td>
                  <td>{event.meetName}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleViewRegistrations(event.eventId)}
                    >
                      View Registrations
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
