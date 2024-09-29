import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './pages/Quiz';
import AdminStart from './pages/AdminStart';
import AdminLogin from './pages/AdminLogin';
import AdminDashBoard from './pages/AdminDashBoard';
// import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/start' element={<AdminStart/>} />
        <Route path='/' element={<Quiz />} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path='/admin' element={<AdminDashBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

