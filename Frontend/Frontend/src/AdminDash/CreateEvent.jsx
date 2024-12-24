import React, { useState } from "react";
import axios from 'axios';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        eventTitle: "",
        meetName: "",
        category: "",
        eventDate: "",
        location: "",
        photoUrl: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
        const token = localStorage.getItem("authToken"); 

        if (!token) {
            alert("Authorization token not found. Please log in.");
            return;
        }

        
            console.log("LOG 1");
            const response = await fetch("http://localhost:8080/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`, // Add the token to the header
                },
                body: JSON.stringify(updatedFormData),
            });
            console.log("LOG 2");
            if (response.ok) {
                
                try {
                    console.log("LOG 3");
                    const contentType = response.headers.get("content-type");
                    let data;
                    if (contentType && contentType.includes("application/json")) {
                        console.log("LOG 4");
                        data = await response.json();
                    } else {
                        console.log("LOG 5");
                        data = { message: "Event created successfully!" };
                    }
                    console.log("LOG 6");
                    setSuccessMessage(data.message);
                } catch (parseError) {
                    console.error("Parsing error:", parseError);
                    setSuccessMessage("Event created successfully!");
                }

                // Reset the form after successful submission
                setFormData({
                    eventTitle: "",
                    meetName: "",
                    category: "",
                    eventDate: "",
                    location: "",
                    photoUrl: ""
                });
            } else {
                try {
                    const errorData = await response.json();
                    alert(errorData.message || "Failed to create event.");
                } catch (parseError) {
                    console.error("Error parsing JSON response:", parseError);
                    alert("Failed to create event. Response was not valid JSON.");
                }
            }
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Error creating event. Please check the console for details.");
        }
    };

    // Inline styles
    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        maxWidth: '400px',
        margin: '50px auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
    };

    const labelStyle = {
        display: 'block',
        marginTop: '15px',
        color: '#555',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    const successMessageStyle = {
        marginTop: '15px',
        color: '#28a745',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
  <h2 style={headingStyle}>Create Event</h2>
  <form onSubmit={handleSubmit} className="create-event-form">
    <label htmlFor="eventTitle" style={labelStyle}>
      <span>
        Event Title <span style={{ color: 'red' }}>*</span>:
      </span>
    </label>
    <input
      type="text"
      id="eventTitle"
      name="eventTitle"
      value={formData.eventTitle}
      onChange={handleChange}
      required
      style={inputStyle}
    />

    <label htmlFor="meetName" style={labelStyle}>
      <span>
        Meet Name <span style={{ color: 'red' }}>*</span>:
      </span>
    </label>
    <input
      type="text"
      id="meetName"
      name="meetName"
      value={formData.meetName}
      onChange={handleChange}
      required
      style={inputStyle}
    />

    <label htmlFor="category" style={labelStyle}>
      <span>
        Category <span style={{ color: 'red' }}>*</span>:
      </span>
    </label>
    <input
      type="text"
      id="category"
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
      style={inputStyle}
    />

    <label htmlFor="eventDate" style={labelStyle}>
      <span>
        Event Date <span style={{ color: 'red' }}>*</span>:
      </span>
    </label>
    <input
      type="date"
      id="eventDate"
      name="eventDate"
      value={formData.eventDate}
      onChange={handleChange}
      required
      style={inputStyle}
    />

    <label htmlFor="location" style={labelStyle}>
      <span>
        Location <span style={{ color: 'red' }}>*</span>:
      </span>
    </label>
    <input
      type="text"
      id="location"
      name="location"
      value={formData.location}
      onChange={handleChange}
      required
      style={inputStyle}
    />

    <label htmlFor="photoUrl" style={labelStyle}>
      <span>
        Event Image <span style={{ color: 'red' }}>*</span>:
      </span>
    </label>
    <input
      type="file"
      onChange={handleFileChange}
      required
      style={inputStyle}
    />

    <button type="submit" style={buttonStyle}>Create Event</button>
    {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
  </form>
</div>

    );
};

export default CreateEvent;
