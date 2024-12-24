import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ViewResult = () => {
  const { eventId } = useParams();
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/results/event/${eventId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response Data:', data);
        setResultData(data);
        setLoading(false);

        // Trigger confetti effect
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchResult();
  }, [eventId]);

  const ResultCard = ({ result }) => {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        marginBottom: '1rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>Congratulations!</h2>
        <p style={{ fontSize: '1.25rem', color: '#3b82f6', marginBottom: '1rem' }}>Here are your result details</p>
        <div style={{ height: '2px', width: '5rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', borderRadius: '9999px', marginBottom: '1rem' }}></div>
        {Object.entries(result).map(([key, value], index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{key}:</span>
            <span style={{ color: '#1e40af', fontWeight: '500', marginLeft: '0.5rem' }}>{value.toString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #dbeafe, #ffffff)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            filter: 'blur(8px)',
            opacity: 0.7,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
            height: `${50 + Math.random() * 100}px`,
            backgroundColor: ['#FFA500', '#FFD700', '#FF69B4', '#00CED1'][i % 4],
            animation: `float${i} ${10 + i}s infinite alternate`
          }}
        />
      ))}
      <style>
        {[...Array(20)].map((_, i) => `
          @keyframes float${i} {
            0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(2); opacity: 0.8; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          }
        `).join('')}
      </style>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '42rem', margin: '0 auto' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : resultData.length > 0 ? (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem', textAlign: 'center' }}>Performance Metrics</h1>
            {resultData.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewResult;