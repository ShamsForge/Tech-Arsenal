import { eventEngine } from "./eventEngine";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  // Listen for intensity changes from popup/content
  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "setIntensity") {
      browser.storage.local.set({ intensity: msg.value });
      if (msg.value > 0) {
        eventEngine.start();
      }
      sendResponse({ status: "ok" });
    }
    if (msg.action === "getIntensity") {
      browser.storage.local.get("intensity").then(data => {
        sendResponse({ intensity: data.intensity ?? 0 });
      });
      return true;
    }
  });

  // On extension load, restore intensity and start engine if needed
  browser.storage.local.get("intensity").then(data => {
    const intensity = data.intensity ?? 0;
    if (intensity > 0) {
      eventEngine.start();
    }
  });
});
