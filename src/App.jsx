import { useState, useEffect, useRef } from "react";
import "./App.css";

import blossomImg from './assets/blossom.png';
import bubblesImg from './assets/bubbles.png';
import buttercupImg from './assets/buttercup.png';

import blossomFly from './assets/blossom-fly.png';
import blossomFinish from './assets/blossom-finish.png';
import bubblesFly from './assets/bubbles-fly.png';
import bubblesFinish from './assets/bubbles-finish.png';
import buttercupFly from './assets/buttercup-fly.png';
import buttercupFinish from './assets/buttercup-finish.png';

import powerpuffTheme from './assets/powerpuff_girls.mp3';

export default function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [character, setCharacter] = useState("blossom");
  const [timerEnded, setTimerEnded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  // New state to show popup
  const themeSoundRef = useRef(null);

  useEffect(() => {
    if (!themeSoundRef.current) {
      const audio = new Audio(powerpuffTheme);
      audio.loop = false;
      themeSoundRef.current = audio;
    }
  }, []);

  useEffect(() => {
    const sound = themeSoundRef.current;
    let interval;

    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isActive && totalSeconds === 0) {
      setIsActive(false);
      setTimerEnded(true);
      sound.play();
      setShowPopup(true); // Show the "Time's Up!" popup

      const loopInterval = setInterval(() => {
        sound.currentTime = 0;
        sound.play();
      }, 4800);

      themeSoundRef.current._loopInterval = loopInterval;
    }

    return () => clearInterval(interval);
  }, [isActive, totalSeconds]);

  const stopSound = () => {
    const sound = themeSoundRef.current;
    if (!sound) return;
    sound.pause();
    sound.currentTime = 0;
    if (sound._loopInterval) {
      clearInterval(sound._loopInterval);
      sound._loopInterval = null;
    }
    setTimerEnded(false);
  };

  const startTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setIsActive(true);
      setShowPopup(false); // Hide popup when starting timer
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
    stopSound();
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setTotalSeconds(0);
    setShowPopup(false); // Close the popup when resetting the timer
    stopSound();
  };

  const setTimerToFiveSeconds = () => {
    setSeconds(5);
    setTotalSeconds(5);
    setIsActive(false);  // Stop the timer immediately
    setTimerEnded(false);  // Make sure the timer is not in the ended state
    setShowPopup(false);  // Hide any existing popup
  };

  const getThemeClass = () => {
    return `app ${character}`;
  };

  const getCharacterImage = () => {
    switch (character) {
      case "blossom":
        return blossomImg;
      case "bubbles":
        return bubblesImg;
      case "buttercup":
        return buttercupImg;
      default:
        return null;
    }
  };

  const getCharacterFlyingImage = () => {
    if (isActive) {
      switch (character) {
        case "blossom": return blossomFly;
        case "bubbles": return bubblesFly;
        case "buttercup": return buttercupFly;
        default: return null;
      }
    } else if (timerEnded) {
      switch (character) {
        case "blossom": return blossomFinish;
        case "bubbles": return bubblesFinish;
        case "buttercup": return buttercupFinish;
        default: return null;
      }
    } else {
      return getCharacterImage();
    }
  };

  return (
    <div className={getThemeClass()}>
      <div className={`timer-box ${timerEnded ? "shake-loop" : ""}`}>
        <img
          src={getCharacterFlyingImage()}
          alt={character}
          className={`character-image ${isActive ? "flying" : ""} ${timerEnded ? "celebrating" : ""}`}
        />
        <h1 className="title">Powerpuff Timer</h1>

        <div className="preset-buttons">
          <button onClick={() => setSeconds(5)}>5 sec</button>
          <button onClick={() => setSeconds(300)}>5 min</button>
          <button onClick={() => setSeconds(900)}>15 min</button>
          <button onClick={() => setSeconds(1800)}>30 min</button>
        </div>

        {/* New button to set timer to 5 seconds */}
        <button onClick={setTimerToFiveSeconds}>Set Timer to 5s</button>

        <div className="button-group">
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={resetTimer}>Reset</button>
        </div>

        <div className="timer-display">
          Time Left: {Math.floor(totalSeconds / 3600)}h {Math.floor((totalSeconds % 3600) / 60)}m {totalSeconds % 60}s
        </div>

        {/* Popup when time is up */}
        {showPopup && (
          <div className="time-up-modal">
            <div className="time-up-content">
              <h2>⚡ TIME’S UP! ⚡</h2>
              <button onClick={resetTimer}>Stop Timer</button>
            </div>
          </div>
        )}

        <div className="character-buttons">
          <button onClick={() => setCharacter("blossom")}>Blossom</button>
          <button onClick={() => setCharacter("bubbles")}>Bubbles</button>
          <button onClick={() => setCharacter("buttercup")}>Buttercup</button>
        </div>
      </div>
    </div>
  );
}
