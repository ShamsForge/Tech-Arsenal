import React, { useEffect, useState } from "react";

import PopupHeader from "./header";
import Intensity from "./intensity";
import PopupButtons from "./buttons";
import PopupFooter from "./footer";
import Loader from "./loader";

import { IntensityProvider } from "../../../context/IntensityContext";

const popupIndex = () => {
  const [loading, setLoading] = useState(false);
  const [intensity, setIntensity] = useState<number>(0);

  useEffect(() => {
    browser.storage.local.get("intensity").then((data) => {
      if (data.intensity !== undefined) setIntensity(data.intensity);
    });

    const t = setTimeout(() => setLoading(false), 1950);
    return () => clearTimeout(t);
  }, []);

  return (
    <IntensityProvider>
      <div className="w-[600px] h-[600px]">
        <div className="popup-background mx-auto p-6 flex flex-col items-center overflow-hidden">
          <PopupHeader />
          <Intensity />
          <PopupButtons />
          <PopupFooter />
        </div>

        {loading && <Loader />}
      </div>
    </IntensityProvider>
  );
};

export default popupIndex;

//intensity={intensity} setIntensity={setIntensity}
