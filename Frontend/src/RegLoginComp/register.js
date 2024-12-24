import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputPassword from './inputPassword';
import './RegLogin.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [validationError, setValidationError] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (password) => {
    setFormData((prevData) => ({ ...prevData, password }));
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData((prevData) => ({ ...prevData, confirmPassword }));

    if (confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
    }
  };

  const handleValidationError = (error) => {
    setValidationError(error);
  };

  const handleResetPasswordField = () => {
    // Trigger reset of the password field inside InputPassword component
    setFormData((prevData) => ({ ...prevData, password: '', confirmPassword: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationError) {
      alert('Enter valid password.');
      return;
    }

    if (errors.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (response.ok) {
        setMessage('User registered successfully! Click on Login.');
        handleResetPasswordField(); // Reset password field on successful registration
      } else {
        setMessage('User Already Exists.');
      } 
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, username: e.target.value }))
          }
        />
        <InputPassword
          onPasswordChange={handlePasswordChange}
          onValidationError={handleValidationError}
          isLogin={false} // Password strength bar visible
          resetPassword={formData.password === ''} // Prop to reset password field
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && <p className="error-prompt">{errors.confirmPassword}</p>}
        <select
          name="role"
          required
          value={formData.role}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, role: e.target.value }))
          }
        >
          <option value="" disabled>
            Select role
          </option>
          <option value="athlete">Athlete</option>
          <option value="coach">Coach</option>
        </select>
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
        <p>
          Already a user? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Register;
