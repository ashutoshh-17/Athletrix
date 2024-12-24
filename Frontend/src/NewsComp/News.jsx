import React, { useState, useEffect } from 'react';
import './News.css';
import Im1 from './im.jpg';
import Im2 from './im2.jpg';
import Im3 from './im3.jpg';
import Im4 from './im4.jpg';
import Im5 from './im5.jpg';
import Im6 from './im6.jpg';
import Im7 from './img7.jpg';
import Im8 from './img8.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const newsData = [
  {
    title: 'Cricket',
    description:
      'The cricketing world is abuzz as the T20 season intensifies. With nail-biting finishes, record-breaking performances, and strategic brilliance, this quarter promises non-stop excitement.',
    status: 'Live - Q4',
    image: Im1,
  },
  {
    title: 'Relay',
    description:
      'Athletes gear up for the much-awaited relay championship. The stakes are high as top national teams prepare to showcase their speed, teamwork, and strategy.',
    status: 'Upcoming',
    image: Im2,
  },
  {
    title: 'Long Jump',
    description:
      'The annual long jump competition wrapped up with record-breaking performances. New techniques in biomechanics are being credited for the sudden surge in results.',
    status: 'Completed',
    image: Im3,
  },
  {
    title: 'Archery',
    description:
      'The global archery championship kicks off, attracting the finest sharpshooters from around the globe. A perfect blend of precision, focus, and tradition is on display.',
    status: 'Upcoming',
    image: Im4,
  },
  {
    title: 'Player Changes',
    description:
      'A strategic masterstroke by Team A! Star Player A steps out, making way for Player B to take the spotlight. Can the substitute change the game.',
    status: 'Change',
    image: Im5,
  },
  {
    title: 'Injury Alert',
    description:
      'A shocking turn of events on the field! Team Austrilia star player suffers an injury, leaving fans and teammates concerned. The team faces a critical moment.',
    status: 'Injured',
    image: Im6,
  },
  {
    title: 'Basketball',
    description:
      'The NBA season starts with electrifying performances. Teams are in full swing, showcasing high-octane matches and remarkable plays.',
    status: 'Completed',
    image: Im7,
  },
  {
    title: 'Swimming',
    description:
      'A breathtaking race unfolds in the pool! Athletes showcase incredible stamina and technique as they push the limits to claim victory.',
    status: 'Live',
    image: Im8,
  },
];

const NewsPage = () => {
  const [visibleNews, setVisibleNews] = useState(newsData.slice(0, 4)); // Initial 4 news
  const [newNewsMessage, setNewNewsMessage] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);

  const handleReadMore = (news) => {
    setSelectedNews(news);
  };

  const closePopup = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleNews.length < newsData.length) {
        setVisibleNews((prevNews) => [...prevNews, newsData[prevNews.length]]);
        setNewNewsMessage('Latest news has arrived!');

        setTimeout(() => setNewNewsMessage(''), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleNews]);

  return (
    <div className="news-page">
      <h1 className="page-title">THE SPORTS BULLETEIN</h1>
      <p className="page-description">Dive into the world of sports with real-time updates and unparalleled perspectives.</p>
      {newNewsMessage && (
        <div className="new-news-message">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          {newNewsMessage}
        </div>
      )}

      <div className="news-grid">
        {visibleNews.map((news, index) => (
          <div key={index} className="news-card">
            <img src={news.image} alt={news.title} className="news-image" />
            <h2>{news.title}</h2>
            <p>
              <strong>Status:</strong> {news.status}
            </p>
            <button className="read-more-btn" onClick={() => handleReadMore(news)}>
              Read More
            </button>
          </div>
        ))}
      </div>

      {selectedNews && (
        <div className="news-popup">
          <div className="popup-content">
            <h2>{selectedNews.title}</h2>
            <p>{selectedNews.description}</p>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;