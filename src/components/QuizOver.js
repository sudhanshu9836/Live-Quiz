// src/components/QuizOver.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const QuizOver = ({ username, score, totalQuestions }) => {
  return (
    <div className="quiz-over">
      <h2>Quiz Completed!</h2>
      <h2>Thank You, {username}!</h2>
      <h3>Your Score: {score} </h3>
      <p>We hope you enjoyed the quiz!</p>
    </div>

  );
};

export default QuizOver;






