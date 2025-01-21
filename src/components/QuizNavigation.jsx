import React from 'react';

const QuizNavigation = ({ currentQuestion, totalQuestions, handleNext, handlePrevious, goToQuestion, answers }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {/* Previous and Next Buttons */}
      <button
        onClick={handlePrevious}
        disabled={currentQuestion === 0}
        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-300"
      >
        Previous
      </button>

      {/* Circular Buttons for Question Navigation */}
      {[...Array(totalQuestions)].map((_, index) => (
        <button
          key={index}
          onClick={() => goToQuestion(index)}
          className={`w-8 h-8 rounded-full ${answers[index] ? 'bg-green-500 text-white' : (currentQuestion === index ? 'bg-blue-500 text-white' : 'bg-gray-300')} text-center flex items-center justify-center`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentQuestion === totalQuestions - 1}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default QuizNavigation;
