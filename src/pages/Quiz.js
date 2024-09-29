import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Quiz.css';
import QuizOver from '../components/QuizOver';
import StartPage from '../components/StartPage';

const socket = io('http://localhost:8080');

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false); // Add state to track if it's the last question

  // Fetching questions from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Socket event handlers
  useEffect(() => {
    socket.on('startQuiz', () => {
      setQuizStarted(true);
      setCurrentQuestion(questions[0]);
      setQuestionIndex(0);
      setIsLoading(false);
    });

    socket.on('newQuestion', (question) => {
      setCurrentQuestion(question);
      setIsAnswered(false);
      setIsLoading(false); 
    });

    socket.on('quizOver', () => {
      setQuizOver(true);
      setIsLoading(false);
    });

    return () => {
      socket.off('startQuiz');
      socket.off('newQuestion');
      socket.off('quizOver');
    };
  }, [questions]);

  // Timer for moving to the next question after 30 seconds
  useEffect(() => {
    let timer;
    if (quizStarted && !quizOver) {
      timer = setTimeout(() => {
        handleNextQuestion();
      }, 30000); 
    }
    return () => clearTimeout(timer);
  }, [quizStarted, quizOver, currentQuestion]);

  // Display loading panel for 5 seconds before showing a question
  useEffect(() => {
    if (currentQuestion) {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false); 
      }, 5000);

      return () => clearTimeout(loadingTimer);
    }
  }, [currentQuestion]);

  // Submitting the score when it's the last question
  useEffect(() => {
    if (isLastQuestion) {
      handleSubmitScore(score);
    }
  }, [score, isLastQuestion]); // Submit score only when the score updates on the last question

  // Handling the answer and updating score correctly
  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setIsAnswered(true);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // If the answer is correct, update the score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Check if it's the last question
    if (questionIndex === questions.length - 1) {
      setIsLastQuestion(true);
    }
  };

  // Handle moving to the next question or ending the quiz
  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const newIndex = questionIndex + 1;
      setQuestionIndex(newIndex);
      setCurrentQuestion(questions[newIndex]);
      setIsAnswered(false);
      setIsLoading(true);
      socket.emit('getNextQuestion');
    } else {
      setIsLastQuestion(true); // This triggers the score submission
    }
  };

  // Submitting the score to the server
  const handleSubmitScore = async (finalScore) => {
    try {
      await axios.post('http://localhost:8080/api/scores/save', {
        username,
        score: finalScore, 
      });
      socket.emit('quizOver'); 
      setQuizOver(true);
    } catch (error) {
      console.error('Error submitting score:', error.response?.data || error.message);
    }
  };

  // Start the quiz by setting up the username and initializing quiz state
  const startQuiz = (name) => {
    setUsername(name);
    setQuizOver(false);
    setScore(0);
    setQuestionIndex(0);
    setIsAnswered(false);
    setIsLoading(true);
    socket.emit('joinQuiz'); 
    socket.emit('requestQuizStart');
  };

  // Rendering quiz end page
  if (quizOver) {
    return (
      <div className="quiz-over-container">
        <QuizOver username={username} score={score} totalQuestions={questions.length} />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {username ? (
        <>
          <h1>Live Quiz</h1>
          {isLoading ? (
            <div className="loading-panel">
              <h2>Loading next question...</h2>
            </div>
          ) : (
            <>
              <h2>{currentQuestion?.question}</h2>
              <div className="options">
                {currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={isAnswered ? (option === currentQuestion.correctAnswer ? 'correct' : 'wrong') : ''}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <StartPage onStart={startQuiz} />
      )}
    </div>
  );
};

export default Quiz;









































