// Character.js
export default function Character({
    character,
    setCharacter,
    getCharacterImage,
    getCharacterFlyingImage,
    isActive,
    timerEnded,
  }) {
    return (
      <div>
        <img
          src={isActive || timerEnded ? getCharacterFlyingImage() : getCharacterImage()}
          alt={character}
          className={`character-image ${isActive ? "flying" : ""} ${timerEnded ? "celebrating" : ""}`}
        />
        <div className="character-buttons">
          <button onClick={() => setCharacter("blossom")}>Blossom</button>
          <button onClick={() => setCharacter("bubbles")}>Bubbles</button>
          <button onClick={() => setCharacter("buttercup")}>Buttercup</button>
        </div>
      </div>
    );
  }
  