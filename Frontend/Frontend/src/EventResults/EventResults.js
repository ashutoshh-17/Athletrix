import React, { useState, useEffect } from 'react';
import './EventResults.css';

const EventResults = () => {
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
        const response = await fetch('http://localhost:8080/api/admin', {
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

  const closePopup = () => {
    setShowPopup(false); // Close the popup
    // Clear popup state
    setAthleteId('');
    setAthleteName('');
    setPublishedDate('');
    setRemarks('');
  };

  const handlePublishResult = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      return;
    }

    const dateTime = `${publishedDate}T00:00:00`;

    const payload = {
      eventId,
      athleteId,
      eventTitle,
      athleteName,
      publishedDate: dateTime,
      remarks,
      published: true,
    };

    try {
      const response = await fetch('http://localhost:8080/api/admin/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to publish result: ${response.status}`);
      }

      alert('Result published successfully!');
      closePopup();
    } catch (err) {
      alert(`Error: ${err.message}`);
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
                      className="publish-button123"
                      onClick={() => handlePublish(event.eventId, event.eventTitle)}
                    >
                      Publish Result
                    </button>
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

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <span className="popup-close" onClick={closePopup}>&times;</span>
            <h2 className="popup-title">Publish Result</h2>
            <form className="popup-form" onSubmit={handlePublishResult}>
            <label htmlFor="eventId">
                Event ID <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" id="eventId" value={eventId} readOnly />

              <label htmlFor="athleteId">
                Athlete ID <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                id="athleteId"
                value={athleteId}
                onChange={(e) => setAthleteId(e.target.value)}
                required
              />

              <label htmlFor="eventTitle">
                Event Title <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" id="eventTitle" value={eventTitle} readOnly />

              <label htmlFor="athleteName">
                Athlete Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                id="athleteName"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value)}
                required
              />

              <label htmlFor="publishedDate">
                Published Date <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
              />

              <label htmlFor="remarks">
                Remarks <span style={{ color: 'red' }}>*</span>
              </label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows="3"
                required
              />

              <div className="popup-buttons">
                <button type="submit" className="publish-button">
                  Publish
                </button>
                <button type="button" className="cancel-button" onClick={closePopup}>
                  Cancel
                </button>
              
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventResults;
