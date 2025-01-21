
import React from 'react';

const QuizQuestion = ({ question, choices, handleAnswer, selectedAnswer, index }) => {
  return (
    <div className="mb-4 p-4 border rounded-lg">
      <p className="font-semibold"><strong>Q{index + 1}:</strong> {question}</p>
      <div className="mt-2">
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(index, choice)}
            className={`w-full p-2 mb-2 rounded-lg ${
              selectedAnswer === choice
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
