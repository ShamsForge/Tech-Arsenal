type HorrorComponent = {
  id: string;
  level: number;
  renderFn: () => void;
};

class EventEngine {
  private components: HorrorComponent[] = [];
  private difficulty = 1;
  
  register(component: HorrorComponent) {
    this.components.push(component);
  }

  start() {
    const interval = this.calculateRandomTime();
    setTimeout(() => {
      const component = this.pickRandomComponent();
      component.renderFn();
      this.start(); // recursive cycle
    }, interval);
  }

  private pickRandomComponent() {
    const eligible = this.components.filter(c => c.level <= this.difficulty);
    return eligible[Math.floor(Math.random() * eligible.length)];
  }

  private calculateRandomTime() {
    return Math.random() * 60000 * this.difficulty;
  }
}

export const eventEngine = new EventEngine();
