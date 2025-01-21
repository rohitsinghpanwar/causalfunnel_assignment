const MotivationalMessage = ({ score }) => {
    const getMessage = () => {
      if (score < 5) return 'You need to work harder. Keep practicing!';
      if (score < 10) return 'You can do it! Keep pushing!';
      return 'Amazing job! Keep up the great work!';
    };
  
    return (
      <div className="text-center text-lg mb-4">
        {getMessage()}
      </div>
    );
  };
  
  export default MotivationalMessage;
  