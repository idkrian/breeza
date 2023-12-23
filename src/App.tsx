import { useState } from "react";
import Weather from "./pages/Weather";
import Home from "./pages/Home";
import { CoordinateProps } from "./helpers/interfaces";

function App() {
  const [isHome, setIsHome] = useState(true);
  const [coordinates, setCoordinates] = useState<CoordinateProps>({
    lat: 0,
    lon: 0,
  });
  const PageDisplay = () => {
    if (isHome) {
      return <Home setIsHome={setIsHome} setCoordinates={setCoordinates} />;
    } else if (!isHome) {
      return <Weather coordinates={coordinates} />;
    }
  };
  return (
    <div
      className={`bg-white rounded-lg flex align-middle justify-center w-4/5 h-3/4`}
    >
      {PageDisplay()}
    </div>
  );
}

export default App;
