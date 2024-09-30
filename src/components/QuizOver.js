// src/components/QuizOver.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const QuizOver = ({ username, score, totalQuestions }) => {
  return (
    <div className="quiz-over font-bold bg-slate-200 w-3/4 rounded-2xl p-5 m-5 container-fluid">
      <h2 className='text-3xl text-green-500 p-4 m-2'>Quiz Completed!</h2>
      <h2 className='text-2xl text-black p-2 m-2'>Thank You, {username}!</h2>
      <h3 className='bg-blue-500 text-white text-3xl py-4 px-4 rounded-xl text-xl'>Your Score: {score} </h3>
      <p className='text-blue-700 text-xl font-bold'>We hope you enjoyed the quiz!</p>
    </div>

  );
};

export default QuizOver;






