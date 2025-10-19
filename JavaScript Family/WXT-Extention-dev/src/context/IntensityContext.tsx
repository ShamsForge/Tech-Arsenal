// src/context/IntensityContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Intensity = 0 | 25 | 50 | 75 | 100;
interface IntensityContextType {
  intensity: Intensity;
  setIntensity: (value: Intensity) => void;
  setNextIntensity: () => void;
}

const IntensityContext = createContext<IntensityContextType | null>(null);

export const IntensityProvider = ({ children }: { children: ReactNode }) => {
  const [intensity, setIntensity] = useState<Intensity>(0);
  const IntensityLevel: Intensity[] = [0, 25, 50, 75, 100];
  const setNextIntensity = () => {
    const idx = IntensityLevel.indexOf(intensity);
    const next = (idx + 1) % IntensityLevel.length;
    setIntensity(IntensityLevel[next]);
  };
  return (
    <IntensityContext.Provider value={{ intensity, setIntensity, setNextIntensity }}>
      {children}
    </IntensityContext.Provider>
  );
};

export const useIntensity = () => {
  const context = useContext(IntensityContext);
  if (!context) throw new Error("useIntensity must be used inside IntensityProvider");
  return context;
};
