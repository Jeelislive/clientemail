import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css'; // Add your CSS file for styling
import API from '../utils/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Registering...');

    try {
      const res = await API.post('/api/auth/register', { email, password });

      // const res = await axios.post('/api/auth/register', { email, password });

      toast.update(toastId, {
        render: res.data.msg,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      setEmail('');
      setPassword('');

      setTimeout(() => {
        window.location.href = '/login'; // Redirect after successful registration
      }, 2000); // small delay for user to see toast

    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.msg || 'Error registering',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Login Link */}
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Register;
