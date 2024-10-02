// src/components/QuizOver.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const QuizOver = ({ username, score, totalQuestions }) => {
  return (
    <div className="quiz-over font-bold bg-slate-200 w-3/4 rounded-2xl p-3 m-3 container container-fluid">
      <h2 className=' text-3xl text-green-400 py-3 top-1'>Quiz Completed!</h2>
      <h2 className='quiz-completed text-2xl py-1'>Thank You, {username}!</h2>
      <h3 className='score bg-transparent border-2 border-white text-white  py-3 rounded-xl '>Your Score: {score} </h3>
      <p className='text-white text-xl font-bold'>We hope you enjoyed the quiz!</p>
    </div>

  );
};

export default QuizOver;






