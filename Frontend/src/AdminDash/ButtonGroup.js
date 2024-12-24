import React from 'react';
import './ButtonGroup.css';
import { CalendarPlus, ListFilter, Medal, Plus, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ButtonGroup = ({ showSection }) => {
  const navigate = useNavigate();
  
  // Placeholder userRole for testing; replace with actual userRole from backend when integrated
  const userRole = 'admin'; // Change to 'user' to test non-admin behavior

  const handleButtonClick = (section) => {
    if (section === 'createEvent') {
      if (userRole === 'admin') {
        navigate('/createevent');
      } else {
        alert("You cannot perform this action. Admin access is required.");
      }
    } else {
      console.log("No matching section for navigation");
    }
  };

  return (
    <div className="btn-group">
      <button onClick={() => handleButtonClick('createEvent')} className="btn">
      <Plus className="btn-icon-left" />
        Create Event
      </button>
    </div>
  );
};

export default ButtonGroup;
