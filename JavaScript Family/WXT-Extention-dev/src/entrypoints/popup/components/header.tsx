
import React, { useEffect, useRef } from "react";

const popupHeader = () => {

  return (
    <div className="flex flex-col">
      <img src={"/minecraft/header/main.png"} 
      alt="The Broken Script" 
      className="h-12 mx-auto items-center" />

      <div className="minecraft-popup-text">
        <img src={'/minecraft/sub-header/og.png'} 
        alt="Here I am" 
        className="h-8 "
        style={{ position: "relative", left: "270px" }}
        />
      </div>
    </div>
  );
};

export default popupHeader;
