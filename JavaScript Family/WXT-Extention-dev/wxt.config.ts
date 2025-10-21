import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  srcDir: "src", // default: "."
  modules: ["@wxt-dev/module-react"],
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "The Broken Script",
      description:
        "This extention is a continuation of a Famous Minecraft Horror mod called The Broken Script." +
        " This is a slow paced horror script that will try to make you feel paranoid. There are random events, few entities and anomalies (and much more)." +
        "" +
        " **USER ADVISORY**" +
        " - It contains Disturbing Imagery and Sounds." +
        " - Events can happen at any time, even when you are not looking at the browser." +
        " - It can make your browser look glitched and broken." +
        " - It can add scary sounds and Graphical Jumpscares to your browser." +
        " - It can even add fake virus alerts to your browser." +
        "" +
        "This is a fanmade extension version of The Broken Script mod and it is Open-Source. and it is 100% safe and never share your data." +
        "" +
        " I dare you to try it out, if you are brave enough for this halloween 2025.",
      version: "0.1.0",
      manifest_version: 3,
      // permissions: ['storage', 'tabs'],
      // In wxt.config.ts manifest function

    };
  },
});
