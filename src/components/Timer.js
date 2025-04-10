// Timer.js
import { useState, useEffect } from "react";

export default function Timer({
  hours,
  minutes,
  seconds,
  setSeconds,
  setTotalSeconds,
  isActive,
  setIsActive,
  setTimerEnded,
  setShowPopup,
}) {
  const [totalSeconds, setTotalSecondsState] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSecondsState((prev) => prev - 1);
      }, 1000);
    } else if (isActive && totalSeconds === 0) {
      setIsActive(false);
      setTimerEnded(true);
      setShowPopup(true);
    }

    return () => clearInterval(interval);
  }, [isActive, totalSeconds]);

  const startTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSecondsState(total);
      setIsActive(true);
      setShowPopup(false); 
    }
  };

  return (
    <div>
      <div className="preset-buttons">
        <button onClick={() => setSeconds(5)}>5 sec</button>
        <button onClick={() => setSeconds(300)}>5 min</button>
        <button onClick={() => setSeconds(900)}>15 min</button>
        <button onClick={() => setSeconds(1800)}>30 min</button>
      </div>

      <button onClick={startTimer}>Start</button>
      <div className="timer-display">
        Time Left: {Math.floor(totalSeconds / 3600)}h {Math.floor((totalSeconds % 3600) / 60)}m {totalSeconds % 60}s
      </div>
    </div>
  );
}
