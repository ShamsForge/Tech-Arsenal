import PopupHeader from "./header";
import IntensityBar from "./intensity";
import PopupButtons from "./buttons";
import PopupFooter from "./footer";

const popupIndex = () => {
  return (
    <div className="w-[600px] h-[600px]">
      <div className="popup-background mx-auto rounded-lg shadow-lg p-6 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center">
        <PopupHeader />
        <IntensityBar />
        <PopupButtons />
        <PopupFooter />
      </div>
    </div>
  );
};

export default popupIndex;
