import React, { useState, useEffect } from 'react';
import './CoachDashboard.css';

const CoachDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:8080/api/coach/view/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setEvents(data); // Assuming the API returns an array of events
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to handle event selection
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="coach-dashboard">
      <header className="dashboard-header">
        <h1>Coach Dashboard</h1>
      </header>
      <main className="dashboard-content">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="events-list">
            <h2>All Events</h2>
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.eventId}
                  className="event-item"
                  onClick={() => handleEventClick(event)}
                >
                  <h3>{event.eventTitle}</h3>
                  <p>Meet Name: {event.meetName}</p>
                  <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                  <p>Location: {event.location}</p>
                  <p>Category: {event.category}</p>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        )}
        <div className="event-details">
          {selectedEvent ? (
            <>
              <h2>Event Details</h2>
              <h3>{selectedEvent.eventTitle}</h3>
              <p>Meet Name: {selectedEvent.meetName}</p>
              <p>Date: {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Category: {selectedEvent.category}</p>
              <h4>Registration Requests:</h4>
              {selectedEvent.registrationRequests && selectedEvent.registrationRequests.length > 0 ? (
                <ul>
                  {selectedEvent.registrationRequests.map((request, index) => (
                    <li key={index}>
                      {request.athleteUsername} - Status: {request.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No registration requests available.</p>
              )}
              <h4>Approved Registrations:</h4>
              {selectedEvent.approvedRegistrations && selectedEvent.approvedRegistrations.length > 0 ? (
                <ul>
                  {selectedEvent.approvedRegistrations.map((approved, index) => (
                    <li key={index}>
                      {approved.athleteUsername} - Status: {approved.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No approved registrations available.</p>
              )}
            </>
          ) : (
            <p>Select an event to view details.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoachDashboard;
