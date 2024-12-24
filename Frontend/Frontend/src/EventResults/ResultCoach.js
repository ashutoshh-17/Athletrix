import React, { useState, useEffect } from 'react';
import './EventResults.css';

const ResultCoach = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [eventId, setEventId] = useState('');
  const [athleteId, setAthleteId] = useState('');
  const [athleteName, setAthleteName] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/coach/view/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEventData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const handlePublish = (id, title) => {
    setEventId(id);
    setEventTitle(title);
    setShowPopup(true); // Open the popup
  };

  const handlePublishResult = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      return;
    }

  };

  const filteredEvents = eventData.filter((event) =>
    event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.meetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="event-results-container">
      <h1>Event Results</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by meet name or event title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="event-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Title</th>
                <th>Meet Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{event.eventTitle}</td>
                  <td>{event.meetName}</td>
                  <td>
                    
                    <button
                      className="view-button123"
                      onClick={() => window.location.href = `/events/view-result/${event.eventId}`}
                    >
                      View Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResultCoach;
