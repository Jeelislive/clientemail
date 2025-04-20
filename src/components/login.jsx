import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'; // Add your CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Logging in...');

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);

      toast.update(toastId, {
        render: 'Login successful!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      setEmail('');
      setPassword('');

      // Optionally redirect
      setTimeout(() => {
        window.location.href = '/dashboard'; // or wherever
      }, 2000);
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.msg || 'Login failed',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>

      {/* Register Link */}
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
