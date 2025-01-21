import React from 'react';

const MotivationalMessage = ({ score }) => {
  if (score < 5) return <p className="text-xl text-red-600">You need to work harder. Keep practicing!</p>;
  if (score < 10) return <p className="text-xl text-yellow-600">You can do it! Keep pushing!</p>;
  return <p className="text-xl text-green-600">Amazing job! Keep up the great work!</p>;
};

const QuizReport = ({ questions, answers, score, email, handleRetry }) => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Quiz Report</h2>

      {/* Display the email */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Email: {email}</p>
      </div>

      {/* Display the score and motivational message */}
      <div className="text-center mb-4">
        <p className="text-2xl font-semibold">{`You scored ${score} out of 15`}</p>
        <MotivationalMessage score={score} />
      </div>

      {/* Display each question, user's answer, and the correct answer */}
      <div>
        {questions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <p className="font-semibold">
              <strong>Q{index + 1}:</strong> {q.question}
            </p>
            <div className="flex justify-between items-center mt-2">
              <p
                className={`p-2 rounded ${
                  answers[index] === (q.correct_answer || q.correctAnswer)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <strong>Your Answer:</strong> {answers[index] || 'Not Attempted'}
              </p>
              <p className="p-2 rounded bg-gray-100">
                <strong>Correct Answer:</strong> {q.correct_answer || q.correctAnswer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Retry button to retake the quiz */}
      <div className="text-center mt-6">
        <button
          onClick={handleRetry}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Attempt Again
        </button>
      </div>
    </div>
  );
};

export default QuizReport;
