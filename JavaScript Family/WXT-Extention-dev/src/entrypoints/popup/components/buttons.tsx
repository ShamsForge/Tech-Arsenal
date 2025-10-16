import { useEffect } from "react";

const popupButtons = () => {

  useEffect(() => {
    // Preload the audio file (use correct path in public folder)
    const audio = new Audio("/minecraft/sound/btn-click.mp3");
    audio.load();}, []);

  const playClickSound = () => {
    const audio = new Audio("/minecraft/sound/btn-click.mp3");
    audio.play();
  };

  return (
    <div>
      <button
        className="minecraft-btn minecraft-font text-white text-lg px-6 py-2 transition-transform mb-4 glitch-btn"
        onClick={playClickSound}
      >
        Set Intensity
      </button>
      <button
        className="minecraft-btn minecraft-font text-white text-lg px-6 py-2 transition-transform glitch-btn"
        onClick={playClickSound}
      >
        Stop
      </button>
    </div>
  );
};

export default popupButtons;
