import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    height: '',
    weight: '',
    category: '',
    photoUrl: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', selectedFile);
    uploadData.append('upload_preset', 'hh8nz3vk'); // Replace with your Cloudinary upload preset
    
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/di6jg0h3n/image/upload', uploadData);
      return response.data.url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed. Please try again.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imageUrl = formData.photoUrl;
  
    if (selectedFile) {
      imageUrl = await handleFileUpload();
      if (!imageUrl) return; // Exit if upload fails
    }
  
    const updatedFormData = { ...formData, photoUrl: imageUrl }; // Ensure `photoUrl` is updated here
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No authentication token found. Please log in.');
        return;
      }
  
      const response = await axios.put('http://localhost:8080/api/athlete/update', updatedFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Profile updated:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  

  const containerStyle = {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
    fontSize: '1.8rem'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 500,
    color: '#555'
  };

  const inputStyle = {
    marginTop: '0.5rem',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23555' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5l-5-5h10l-5 5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '12px'
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={containerStyle}>
    <h2 style={headingStyle}>Update Profile</h2>
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        <span>
          Profile Photo <span style={{ color: 'red' }}>*</span>:
        </span>
        <input type="file" onChange={handleFileChange} style={inputStyle} />
      </label>
      <label style={labelStyle}>
        <span>
          First Name <span style={{ color: 'red' }}>*</span>:
        </span>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        <span>
          Last Name <span style={{ color: 'red' }}>*</span>:
        </span>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        <span>
          Birth Date :
        </span>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        <span>
          Gender <span style={{ color: 'red' }}>*</span>:
        </span>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          style={selectStyle}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label style={labelStyle}>
        <span>
          Height (cm) <span style={{ color: 'red' }}>*</span>:
        </span>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        <span>
          Weight (kg) <span style={{ color: 'red' }}>*</span>:
        </span>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        <span>
          Category <span style={{ color: 'red' }}>*</span>:
        </span>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>
      <button type="submit" style={buttonStyle}>Update Profile</button>
    </form>
  </div>
  

  );
};

export default UpdateProfile;
