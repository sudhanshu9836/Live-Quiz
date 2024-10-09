import React, { useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import AdminStart from './AdminStart.js';


const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('https://live-quiz-backend-pvjf.onrender.com/api/admin/download-scores', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'quiz_scores.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <>
      <AdminStart/> 
    <div className='admin-dashboard container w-3/4 rounded-xl py-5 m-5'>
      <h1 className='p-4 text-white font-bold text-3xl'>Admin Dashboard</h1>
      <button className='admin-dashboard-btn' onClick={handleDownload}>Download Quiz Results</button>
    </div>
    </>
  );
};

export default AdminDashboard;

