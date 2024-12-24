import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoachProfile.css';
import profilepic from './profilepic.png';
import axios from 'axios';

const CoachProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for recent updates
  const [recentEvents, setRecentEvents] = useState([
    { name: 'DiscusForce Throw', date: '10/15/2024', location: 'Olympic Stadium', category: 'Throw' },
       { name: 'RelayChamp 4x100m', date: '9/29/2024', location: 'Olympic Stadium', category: '4x100m' },
       { name: 'Golden Mile Run', date: '9/27/2024', location: 'Olympic Stadium', category: '200M' },
       { name: 'SpeedBurst 200m Sprint', date: '9/23/2024', location: 'Olympic Stadium', category: '200m' },
       { name: 'LeapPro Long Jump', date: '9/17/2024', location: 'Olympic Stadium', category: '10M' },
       { name: 'VaultKing Pole Vault', date: '9/11/2024', location: 'Olympic Stadium', category: '10M' },
       { name: 'Rapid Dash', date: '9/5/2024', location: 'Olympic Stadium', category: '100M' },
       { name: 'SprintMaster 100m Dash', date: '9/4/2024', location: 'Olympic Stadium', category: '100M' },
       { name: 'HurdleHero 110m', date: '9/2/2024', location: 'Olympic Stadium', category: '110M Hurdles' },
       { name: 'JavelinJet Throw', date: '8/31/2024', location: 'Olympic Stadium', category: 'Throw' },
       { name: 'MarathonMaster', date: '8/31/2024', location: 'Olympic Stadium', category: 'Marathon' }
  ]);
  const [recentResults, setRecentResults] = useState([
     { event: 'JavelinJet Throw', meet: 'Lightning Bolt Championships', first: 'Neeraj Chopra', second: 'Vikas Gowda', third: 'Anil Kumar' },
       { event: 'HurdleHero 110m', meet: 'Victory Sprint Classic', first: 'Jinson Johnson', second: 'Sreeshankar', third: 'Rohit Yadav' },
       { event: 'MarathonMaster', meet: 'Grand Marathon Challenge', first: 'Kheta Ram', second: 'Brahmanand Sankhla', third: 'Lalita Babar' },
       { event: 'SprintMaster 100m Dash', meet: 'Victory Sprint Classic', first: 'Hima Das', second: 'Dutee Chand', third: 'Anjali Devi' },
       { event: 'DiscusForce Throw', meet: 'Lightning Bolt Championships', first: 'Seema Antil', second: 'Ravi Kumar', third: 'Vikas Gowda' },
       { event: 'RelayChamp 4x100m', meet: 'Grand Marathon Challenge', first: 'Dutee Chand', second: 'Hima Das', third: 'Miksha', fourth: 'Anjali Devi' },
       { event: 'Golden Mile Run', meet: 'Grand Marathon Challenge', first: 'Sandeep Kumar', second: 'Suresh Kumar', third: 'Ramesh Babu' },
       { event: 'SpeedBurst 200m Sprint', meet: 'Grand Marathon Challenge', first: 'Mohammad Anas', second: 'Arokia Rajiv', third: 'Maharana Pratap' },
       { event: 'LeapPro Long Jump', meet: 'Lightning Bolt Championships', first: 'M Sreeshankar', second: 'Anju Bobby George', third: 'Inderjeet Singh' },
       { event: 'VaultKing Pole Vault', meet: 'Lightning Bolt Championships', first: 'Shivpal Singh', second: 'Tejinderpal Singh', third: 'Jaspreet Singh' },
       { event: 'Rapid Dash', meet: 'Victory Sprint Classic', first: 'Hima Das', second: 'Tejaswin Shankar', third: 'Manpreet Kaur' }
  ]);

  // State for managing flashcard index
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('No authentication token found. Please log in.');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/coach/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setProfileData(response.data);
        setLoading(false);

        if (
          !response.data.firstName ||
          !response.data.lastName ||
          !response.data.birthDate ||
          !response.data.gender ||
          !response.data.speciality ||
          !response.data.category ||
          !response.data.photoUrl
        ) {
          alert('You must update your profile before continuing.');
          navigate('/update-coach');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Real-time updates
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/coach/updates', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const { newEvents, newResults } = response.data;

        if (newEvents && newEvents.length > 0) {
          setRecentEvents((prev) => [...newEvents, ...prev]);
        }

        if (newResults && newResults.length > 0) {
          setRecentResults((prev) => [...newResults, ...prev]);
        }
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };

    const interval = setInterval(fetchUpdates, 10000);
    return () => clearInterval(interval);
  }, []);

  // Flash card rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % recentEvents.length);
      setCurrentResultIndex((prevIndex) => (prevIndex + 1) % recentResults.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [recentEvents, recentResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileData?.photoUrl?.trim() ? profileData.photoUrl : profilepic} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{profileData.firstName} {profileData.lastName}</h1>
          <div className="profile-details">
            <p>DOB : {profileData.birthDate}</p>
            <p>Gender : {profileData.gender}</p>
            <p>Speciality : {profileData.speciality}</p>
            <p>Category : {profileData.category}</p>
          </div>
          <button className="edit-button" onClick={() => navigate('/update-coach')}>Edit Profile</button>
        </div>
      </div>

      <div className="recent-updates-container">
        <h2>Recent Updates</h2>
        <div className="recent-updates">
          {/* Flashcard for Events */}
          <div className="flash-card">
            <h3>Recently Created Events</h3>
            <div className="event-card">
              <h4>{recentEvents[currentEventIndex].name}</h4>
              <p>{recentEvents[currentEventIndex].date}</p>
              <p>{recentEvents[currentEventIndex].location}</p>
              <p>{recentEvents[currentEventIndex].category}</p>
            </div>
          </div>

          {/* Flashcard for Results */}
          <div className="flash-card">
            <h3>Recently Published Results</h3>
            <div className="result-card">
              <h4>{recentResults[currentResultIndex].event}</h4>
              <div className="positions">
                <p><i className="fas fa-trophy gold"></i> {recentResults[currentResultIndex].first}</p>
                <p><i className="fas fa-trophy silver"></i> {recentResults[currentResultIndex].second}</p>
                <p><i className="fas fa-trophy bronze"></i> {recentResults[currentResultIndex].third}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
