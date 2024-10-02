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
    <div className=" text-black start-page p-4 m-4 rounded-xl mt-4 pt-5 ">
      <h1 className='text-black text-4xl p-4 container-fluid my-1 py-4 font-bold'>Welcome to the Quiz!</h1>
      <input
      className='outline-none bg-none rounded-xl '
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
     <button onClick={handleStart} disabled={!quizStarted} className='bg-green-300 hover:bg-slate-200 mt-4'>
    {quizStarted ? 'Join Quiz' : 'Waiting for Admin to Start...'}
</button>
    </div>
  );
};

export default StartPage;




