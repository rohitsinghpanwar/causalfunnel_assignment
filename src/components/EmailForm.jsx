
import React from 'react';

const EmailForm = ({ email, setEmail, setIsAuthenticated }) => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <fieldset className='border border-gray-600 p-4 rounded-lg align-center w-[40%] h-[30%]  '>
        <legend className='font-bold text-3xl text-gray-600'>QuirkyQuiz</legend>
      <h1 className="text-2xl font-bold text-center mb-4">Start Quiz</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />
      <button
        onClick={() => setIsAuthenticated(true)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Start Quiz
      </button>
      </fieldset>
</div>
  );
};

export default EmailForm;
