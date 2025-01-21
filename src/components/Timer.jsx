
import React, { useEffect } from 'react';

const Timer = ({ timer, setTimer, handleSubmit }) => {
  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimer, handleSubmit]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="text-xl font-semibold text-center mb-4">{`Time Left: ${formatTime(timer)}`}</div>
  );
};

export default Timer;
