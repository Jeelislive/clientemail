import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      // If no token, redirect to login
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData ? userData.email : 'User'}!</h1>
      <div className="user-info">
        <h2>User Details</h2>
        {userData ? (
          <div className="user-details">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Account Created:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
