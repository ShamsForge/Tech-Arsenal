import React, { useEffect, useState } from "react";

import PopupHeader from "./header";
import IntensityBar from "./intensity";
import PopupButtons from "./buttons";
import PopupFooter from "./footer";
import Loader from "./loader";

const popupIndex = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1950);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-[600px] h-[600px]">
      <div className="popup-background mx-auto p-6 flex flex-col items-center overflow-hidden">
        <PopupHeader />
        <IntensityBar />
        <PopupButtons />
        <PopupFooter />
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default popupIndex;
