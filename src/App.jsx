import React, { useState, useEffect } from 'react';
import EmailForm from './components/EmailForm'; // EmailForm.jsx
import QuizReport from './components/QuizReport';
import QuizTimer from './components/Timer';
import QuestionCard from './components/QuizQuestion';
import QuizNavigation from './components/QuizNavigation';
import fallbackQuestions from './fallbackQuestions.json'; // Local fallback questions

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [timer, setTimer] = useState(1800); // 30 minutes
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is authenticated
  const [questions, setQuestions] = useState([]); // Store questions fetched from API or fallback

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=15');
        
        if (response.status === 429) {
          // Handle rate limit error (429) gracefully
          console.error('Rate limit exceeded, using fallback questions');
          setQuestions(fallbackQuestions.questions); // Fallback to local questions
          return;
        }

        const data = await response.json();

        if (data.results && data.results.length) {
          // Process API questions (they use `incorrect_answers` and `correct_answer`)
          const apiQuestions = data.results.map((q) => ({
            question: q.question,
            choices: [...q.incorrect_answers, q.correct_answer], // Concatenate choices
            correctAnswer: q.correct_answer, // Use correct_answer field for API questions
          }));
          setQuestions(apiQuestions);
        } else {
          setQuestions(fallbackQuestions.questions); // Fallback to local questions
        }
      } catch (error) {
        console.error('API request failed, using fallback questions');
        setQuestions(fallbackQuestions.questions); // Fallback to local questions if API fails
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleAnswer = (index, choice) => {
    setAnswers({ ...answers, [index]: choice });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) calculatedScore++; // Use `correctAnswer` for both API and fallback questions
    });
    setScore(calculatedScore);
    setShowReport(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowReport(false);
    setTimer(1800); // Reset timer to 30 minutes
  };

  const handleStartQuiz = () => {
    if (email.trim() !== '') {
      setIsAuthenticated(true); // Allow the quiz to start
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {!isAuthenticated ? (
        // Show Email Form before starting the quiz
        <EmailForm email={email} setEmail={setEmail} setIsAuthenticated={handleStartQuiz} />
      ) : !showReport ? (
        // Show the quiz after email is entered
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6">
          <QuizTimer timer={timer} setTimer={setTimer} handleSubmit={handleSubmit} />

          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestion]?.question || 'No question available'}
              choices={questions[currentQuestion]?.choices || []} // Use `choices` for both API and fallback questions
              handleAnswer={handleAnswer}
              selectedAnswer={answers[currentQuestion]}
              index={currentQuestion}
            />
          )}

          <div className="text-center text-lg font-semibold mt-4">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            goToQuestion={goToQuestion}
            answers={answers}
          />

          <div className="mt-4 text-center">
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        // Show the Quiz Report after quiz submission
        <QuizReport
          questions={questions}
          answers={answers}
          score={score}
          email={email} // Pass the email to QuizReport
          handleRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default App;
