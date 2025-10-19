import { useIntensity } from "../../../context/IntensityContext";

const Intensity: React.FC = () => {
  const { intensity } = useIntensity();
  const label =
    intensity === 0 ? "Set Intensity to get Started" :
    intensity === 25 ? "Difficulty: Low" :
    intensity === 50 ? "Difficulty: Medium" :
    intensity === 75 ? "Difficulty: High" :
    intensity === 100 ? "Difficulty: Extreme" :
    `Intensity: ${intensity}%`;

  const desc =
    intensity === 0 ? "Turned Off" :
    intensity === 25 ? "Safe place, perfect for kids" :
    intensity === 50 ? "Balanced, fun for the most" :
    intensity === 75 ? "Challenging, not for the weaklings" :
    intensity === 100 ? "Are you sure bro?" :
    `Intensity: ${intensity}%`;

  // Color shade for intensity
  const color =
    intensity === 0 ? "text-gray-400" :
    intensity === 25 ? "text-green-400" :
    intensity === 50 ? "text-yellow-400" :
    intensity === 75 ? "text-orange-400" :
    intensity === 100 ? "text-red-500" :
    "text-gray-200";

  // Color shade for intensity
  const colordesc =
    intensity === 0 ? "text-gray-400" :
    intensity === 25 ? "text-green-600" :
    intensity === 50 ? "text-yellow-600" :
    intensity === 75 ? "text-orange-600" :
    intensity === 100 ? "text-red-600" :
    "text-gray-200";

  return (
    <div className="w-full text-center mb-8">
      <h2 className={`minecraft-font font-bold text-3xl ${color}`}>{label}</h2>
      <p className={`text-2xl rubik-glitch font-minecraftia mt-2 tracking-wider outline-3 ${colordesc}`}>{desc}</p>
    </div>
  );
};

export default Intensity;