// Import all horror components for registration
import { FakeBsod } from "../../components/1/fakebsod/fakeBsod";
// import { GlitchedBsod } from "../../components/2/glitchedBsod/glitchedBsod";
// import { IconAnomaly } from "../../components/3/header-icon-anomaly/iconAnomaly";
import { TextManipulate } from "../../components/4/Text-Manipulate-Anamoly/textManipulate";
import { useIntensity } from "../../context/IntensityContext";

type HorrorComponent = {
  id: string;
  level: number;
  renderFn: () => void;
};

class EventEngine {
  private components: HorrorComponent[] = [];
  register(component: HorrorComponent) {
    this.components.push(component);
  }

  start() {
    const { intensity } = useIntensity();
    if (intensity === 0) return;
    const interval = this.calculateRandomTime(intensity);
    setTimeout(() => {
      const component = this.pickRandomComponent(intensity);
      component.renderFn();
      this.start(); // recursive cycle
    }, interval);
  }

  private pickRandomComponent(intensity: number) {
    const eligible = this.components.filter(c => c.level <= intensity);
    return eligible[Math.floor(Math.random() * eligible.length)];
  }

  private calculateRandomTime(intensity: number) {
    return Math.random() * 60000 * intensity;
  }
}

export const eventEngine = new EventEngine();
