
const popupHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <img 
      src={"/minecraft/header/The-Broken-Script.png"} 
      alt="The Broken Script" 
      className="h-12 mx-auto"/>
      <img
        src={"/minecraft/header/Here-I-Am.png"}
        alt="Here I am"
        className="h-8 transform rotate-[-8deg]"
        style={{ position: "relative", left: "175px", bottom: "15px" }}
      />
    </div>
  );
};

export default popupHeader;
