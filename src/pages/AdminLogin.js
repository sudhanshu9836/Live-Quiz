import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
         navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
        console.log(error);
        setError('Login failed, please try again.');
    }
  };

  return (
    <div className="admin-login w-3/4 rounded-xl mx-3 my-auto container flex justify-center items-center m-10 mx-auto">
      <h2 className='text-white text-3xl m-4 p-4'>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
        className='m-4 rounded-md p-4 outline-none text-black'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
        className='m-4 rounded-md p-3 outline-none text-black'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" 
        className='w-40 p-1 mt-4 transition-all duration-500 font-bold -translate-y-1 transition-all duration-500 '
        onClick={handleLogin}>Login</button>
      </form>
      {error && <p className="error font-bold">{error}</p>}
    </div>
  );
};

export default AdminLogin;
