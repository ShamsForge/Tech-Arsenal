import { useEffect } from "react";
import { useIntensity } from "../../../context/IntensityContext";

const popupButtons = () => {
  const { intensity, setIntensity, setNextIntensity } = useIntensity();

  useEffect(() => {
    // Preload the audio file (use correct path in public folder)
    const audio = new Audio("/minecraft/sound/btn-click.mp3");
    audio.load();}, []);

  
  const playClickSound = () => {
    const audio = new Audio("/minecraft/sound/btn-click.mp3");
    audio.play();
  };



  return (
    <div className="w-full flex flex-col items-center text-center absolute left-0 right-0 bottom-40 scale-125">
      <button
        className="minecraft-btn minecraft-font text-white text-lg px-8 py-3 mb-3 shadow-lg font-bold"
        onClick={() => { setNextIntensity(); playClickSound(); }}>
        Intensity: {intensity === 0 ? "Off" : intensity === 25 ? "Low" : intensity === 50 ? "Medium" : intensity === 75 ? "High" : "Extreme"}
      </button>
      <button
        className="minecraft-btn minecraft-font text-white text-lg px-8 py-3 shadow-lg font-bold"
        onClick={() => {playClickSound(); setIntensity(0); }}
      >
        Stop
      </button>
    </div>
  );
};

export default popupButtons;
