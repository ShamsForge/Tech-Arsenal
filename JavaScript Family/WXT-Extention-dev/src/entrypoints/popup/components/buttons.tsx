
const popupButtons = () => {
  const playClickSound = () => {
    const audio = new Audio("/minecraft/sound/btn-click.ogg.mp3");
    audio.play();
  };

  return (
    <div className="mb-7">
      <button
        className="minecraft-btn minecraft-font text-white text-lg px-6 py-2 transition-transform mb-4"
        onClick={playClickSound}
      >
        Set Intensity
      </button>
      <button
        className="minecraft-btn minecraft-font text-white text-lg px-6 py-2 transition-transform"
        onClick={playClickSound}
      >
        Stop
      </button>
    </div>
  );
};

export default popupButtons;
