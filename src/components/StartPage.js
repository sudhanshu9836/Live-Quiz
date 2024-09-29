import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Establish socket connection
const socket = io('http://localhost:8080');

const StartPage = ({ onStart }) => {
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connected to server'); // Log for debugging
    });

    socket.on('startQuiz', () => {
        console.log('Quiz has started event received'); // Log when the event is received
        setQuizStarted(true); // Update state to reflect quiz start
    });

    return () => {
        socket.off('startQuiz'); // Clean up listener on unmount
    };
}, []);

  const handleStart = () => {
    if (username) {
      onStart(username); // Pass the username to the parent component
    }
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
     <button onClick={handleStart} disabled={!quizStarted}>
    {quizStarted ? 'Join Quiz' : 'Waiting for Admin to Start...'}
</button>
    </div>
  );
};

export default StartPage;




