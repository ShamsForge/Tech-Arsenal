

type Props = { intensity: number };

const Intensity: React.FC<Props> = ({ intensity }) => {
    
  const label =
    intensity === 0 ? "" :
    intensity === 25 ? "Difficulty: Low" :
    intensity === 50 ? "Difficulty: Medium" :
    intensity === 75 ? "Difficulty: High" :
    intensity === 100 ? "Difficulty: Extreme" :
    `Intensity: ${intensity}%`;

  return (
    <div className="w-full my-2">
      <h2 className="text-sm text-gray-300">{label}</h2>
      <p className="text-xs text-gray-400">Value: {intensity}%</p>
    </div>
  );
};

export default Intensity;