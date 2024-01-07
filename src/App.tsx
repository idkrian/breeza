import { useState } from "react";
import Weather from "./pages/Weather";
import Home from "./pages/Home";
import { CoordinateProps } from "./helpers/interfaces";
import Switcher from "./organisms/Switcher";

function App() {
  const [isHome, setIsHome] = useState(true);
  const [coordinates, setCoordinates] = useState<CoordinateProps>({
    lat: 0,
    lon: 0,
  });
  const [cityName, setCityName] = useState("");

  const PageDisplay = () => {
    if (isHome) {
      return (
        <Home
          setIsHome={setIsHome}
          setCoordinates={setCoordinates}
          setCityName={setCityName}
        />
      );
    } else if (!isHome) {
      return (
        <Weather
          coordinates={coordinates}
          setCityName={setCityName}
          cityName={cityName}
        />
      );
    }
  };
  return (
    <div
      className={`bg-white dark:bg-darkGray rounded-2xl flex align-middle w-4/5 h-3/4 relative`}
    >
      <Switcher />
      {PageDisplay()}
    </div>
  );
}

export default App;
