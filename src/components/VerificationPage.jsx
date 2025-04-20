import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/api/auth/verify/${token}`);

        toast.success(response.data.msg || 'Email verified successfully!');

        // Redirect after delay
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg || 'Verification failed.');
        } else {
          toast.error('Server not responding. Please try again later.');
        }
      }

      setLoading(false);
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verification-page">
      <h2>Email Verification</h2>
      <p>{loading ? 'Verifying...' : 'Please wait while we verify your email.'}</p>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default VerificationPage;
