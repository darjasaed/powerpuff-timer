// Popup.js
export default function Popup({ showPopup, resetTimer }) {
    if (!showPopup) return null;  // Don't render if showPopup is false
    return (
      <div className="time-up-modal">
        <div className="time-up-content">
          <h2>⚡ TIME’S UP! ⚡</h2>
          <button onClick={resetTimer}>Stop Timer</button> {/* Call resetTimer on click */}
        </div>
      </div>
    );
  }
  