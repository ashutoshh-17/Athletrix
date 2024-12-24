import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './NavComp/Navbar';
import EventPage from './EventsComp/EventCard';
import Login from './RegLoginComp/login';
import Register from './RegLoginComp/register';
import News from './NewsComp/News';
import UserProfile from './UserProfile/UserProfile'
import LandingPage from './LandingPage/LandingPage';
import AthleteProfile from './AthleteProfile/AthleteProfile';
import ButtonGroup from './AdminDash/ButtonGroup';
import CreateEvent from './AdminDash/CreateEvent';
import AdminDash from './AdminDash/AdminDash';
import EventResults from './EventResults/EventResults';
import EventsPage from './EventsPage/EventsPage';
import ViewRegistrations from './ViewRegistrations/ViewRegistrations';
import CoachDashboard from './CoachDashboard/CoachDashboard';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import CoachProfile from './UserProfile/CoachProfile';
import UpdateCoach from './UpdateProfile/UpdateCoach';
import ViewResult from './EventResults/ViewResult';
import ResultAthlete from './EventResults/ResultAthlete';
import CoachEvents from './CoachDashboard/CoachEvents';
import DietPlan from './DietPlan/DietPlan';
import ResultCoach from './EventResults/ResultCoach';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/createevent" element={<PageTransition><CreateEvent /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/events" element={<PageTransition><EventPage /></PageTransition>} />
        <Route path="/buttongroup" element={<PageTransition><ButtonGroup /></PageTransition>} />
        <Route path="/coach-dashboard" element={<PageTransition><CoachDashboard /></PageTransition>} />
        <Route path="/athlete-dashboard" element={<PageTransition><AthleteProfile /></PageTransition>} />
        <Route path="/user-profile" element={<PageTransition><UserProfile/></PageTransition>} />
        <Route path="/api/admin" element={<PageTransition><AdminDash /></PageTransition>} />
        <Route path="/events/results" element={<PageTransition><EventResults /></PageTransition>} />
        <Route path="/events/results/athlete" element={<PageTransition><ResultAthlete /></PageTransition>} />
        <Route path="/events/results/coach" element={<PageTransition><ResultCoach /></PageTransition>} />
        <Route path="/coach/events" element={<PageTransition><CoachEvents /></PageTransition>} />
        <Route path="/events/view-result/:eventId" element={<PageTransition><ViewResult /></PageTransition>} />
        <Route path="/events/registrations" element={<PageTransition><EventsPage /></PageTransition>} />
        <Route path="/events/view-registrations/:eventId" element={<PageTransition><ViewRegistrations /></PageTransition>} />
        <Route path="/update-profile" element={<PageTransition><UpdateProfile /></PageTransition>} />
        <Route path="/coach-profile" element={<PageTransition><CoachProfile /></PageTransition>} />
        <Route path="/update-coach" element={<PageTransition><UpdateCoach /></PageTransition>} />
        <Route path="/diet-plan" element={<PageTransition><DietPlan /></PageTransition>} />
        
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [userRole, setUserRole] = useState(null);

  // Handle login and set role
  const handleLogin = async (loginData) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login response data:', data); // Debug response data
        const { role } = data;
        setUserRole(role);
        localStorage.setItem('userRole', role);
        console.log('Role set and stored:', role); // Debug role set
      } else {
        console.error('Login failed. Status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const App = () => {
    const [role, setRole] = useState(localStorage.getItem("role"));
  
    const handleLogin = (newRole) => {
      localStorage.setItem("role", newRole);
      setRole(newRole); // Update role in state
    };

    const handleLogout = () => {
      // Clear role from localStorage and state
      localStorage.removeItem("role");
      setRole(null);
    };
  
    return <Navbar role={role} />;
  };  

  // Inside useEffect
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    console.log('Role retrieved from localStorage:', storedRole); // Debug stored role
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <Router>
      <Navbar role={userRole} /> {/* Pass the role as prop to Navbar */}
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
