// src/components/QuizOver.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const QuizOver = ({ username, score, totalQuestions }) => {
  return (
    <div className="quiz-over font-bold bg-slate-200 w-3/4 rounded-2xl p-5 m-5 bg-blue-800 container-fluid">
      <h2 className='text-3xl text-green-500 p-4 m-2'>Quiz Completed!</h2>
      <h2 className='text-2xl text-white p-2 m-2'>Thank You, {username}!</h2>
      <h3 className='bg-transparent border-2 border-white text-white text-3xl py-4 px-4 rounded-xl text-xl'>Your Score: {score} </h3>
      <p className='text-white text-xl font-bold'>We hope you enjoyed the quiz!</p>
    </div>

  );
};

export default QuizOver;






