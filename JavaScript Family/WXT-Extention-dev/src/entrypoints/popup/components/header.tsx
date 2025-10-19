import React, { useEffect, useState } from "react";
import { useIntensity } from "@/context/IntensityContext";
import Intensity from "./intensity";


const subHeaderArray = [
  "/minecraft/sub-header/og.png",
  "/minecraft/sub-header/1.png",
  "/minecraft/sub-header/2.png",
  "/minecraft/sub-header/3.png",
  "/minecraft/sub-header/4.png",
  "/minecraft/sub-header/5.png",
  "/minecraft/sub-header/6.png",
  "/minecraft/sub-header/7.png",
];

const PopupHeader: React.FC = ( ) => {
  const { intensity, setIntensity, setNextIntensity } = useIntensity();
  const [sub, setSub] = useState<string>(subHeaderArray[0]);

  useEffect(() => {
    const pick = subHeaderArray[Math.floor(Math.random() * subHeaderArray.length)];
    setSub(pick);
  }, []);

  return (
    <div className="flex flex-col my-10 items-center">
      <img
        src={'/minecraft/header/main.png'}
        alt="The Broken Script"
        className="h-12 mx-auto items-center"
      />

      <div className="minecraft-popup-text mt-2">
        <img
          src={sub}
          alt="sub header"
          className="h-8"
          style={{ position: "relative", left: "150px" }}
        />
      </div>
    </div>
  );
};

export default PopupHeader;
