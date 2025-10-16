
import React, { useEffect, useRef } from "react";

const popupHeader = () => {
  const hereRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = hereRef.current;
    if (!el) return;

    let timeout: number;
    const pulse = () => {
      el.classList.add("glitch");
      timeout = window.setTimeout(() => el.classList.remove("glitch"), 900);
    };

    // initial delay then pulse every ~6 seconds
    const interval = window.setInterval(pulse, 6000);
    // trigger first pulse shortly after mount
    window.setTimeout(pulse, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img src={"/minecraft/header/The-Broken-Script.png"} alt="The Broken Script" className="h-12 mx-auto" />

      <div
        ref={hereRef}
        className="here-wrapper"
        style={{
          // store the background image used by pseudo elements if needed
          ['--img' as any]: `url('/minecraft/header/Here-I-Am.png')`,
          position: 'relative',
          left: '175px',
          bottom: '15px',
        }}
      >
        <img src={'/minecraft/header/Here-I-Am.png'} alt="Here I am" className="h-8" />
      </div>
    </div>
  );
};

export default popupHeader;
