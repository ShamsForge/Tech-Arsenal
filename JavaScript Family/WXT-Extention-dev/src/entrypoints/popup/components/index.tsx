import React, { useEffect, useState } from "react";

import PopupHeader from "./header";
import Intensity from "./intensity";
import PopupButtons from "./buttons";
import PopupFooter from "./footer";
import Loader from "./loader";



const popupIndex = () => {
  const [loading, setLoading] = useState(false);
  const [intensity, setIntensity] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1950);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-[600px] h-[600px]">
      <div className="popup-background mx-auto p-6 flex flex-col items-center overflow-hidden">
        <PopupHeader />
        <Intensity intensity={intensity} />
        <PopupButtons intensity={intensity} setIntensity={setIntensity} />
        <PopupFooter />
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default popupIndex;
