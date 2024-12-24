import React, { useState, useEffect } from 'react';
import './EventCard.css';
import eventPlaceholder from './eventPlaceholder.png'; // Fallback image if no image is provided

const EventCard = ({ eventData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log('photoUrl:', eventData.photoUrl);

  const handleRegister = async () => {
    const confirmRegister = window.confirm(
      `Are you sure you want to register for "${eventData.eventTitle}"?`
    );

    if (confirmRegister) {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          alert('You are not logged in. Please log in to continue.');
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/athlete/register/${eventData.eventId}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          alert(`Successfully registered for "${eventData.eventTitle}"!`);
        } else {
          const errorMessage = await response.text();
          alert(`Failed to register: ${errorMessage}`);
        }
      } catch (error) {
        alert('An error occurred. Please check your network connection and try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div
      className={`event-card ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="event-image">
        <img src={eventData.photoUrl || eventPlaceholder} alt={eventData.eventTitle} />
        <button className="show-details-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </button>
      </div>
      <div className="event-info">
        <h3>{eventData.eventTitle}</h3>
        <div className="event-details">
          <p className="date">Date: {new Date(eventData.eventDate).toLocaleDateString()}</p>
          <p className="meet">Meet: {eventData.meetName}</p>
          <p className="category">Category: {eventData.category}</p>
        </div>
        {isExpanded && (
          <div className="expanded-content">
            <p>Venue: {eventData.location || 'Venue details unavailable'}</p>
            <button className="register-btn" onClick={handleRegister}>
              Register Now
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('You must be logged in to view events.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8080/api/athlete',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEvents(data);
        } else {
          const errorMessage = await response.text();
          setError(errorMessage);
        }
      } catch (error) {
        setError('Failed to fetch events. Please check your network connection.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="root">
      <div className="events-container">
        {events.map((event, index) => (
          <EventCard key={event.eventId || index} eventData={event} />
        ))}
      </div>
    </div>
  );
};


export default EventsGrid;
