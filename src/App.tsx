import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./molecules/Card";
interface WeatherProps {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: "stations";
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
function App() {
  const [weather, setWeather] = useState<WeatherProps>();
  const getWeather = async () => {
    const weatherData = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=a84fa02c10f107905f4968c8ec0bea59"
    );
    setWeather(weatherData.data);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="bg-darkGray rounded-lg p-8">
      <div className="flex">
        <p className="text-white text-lg font-semibold">City:</p>
        <input
          type="text"
          name=""
          id=""
          className="bg-darkGray rounded-lg border-2 border-background ml-4"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {weather && (
          <div className="flex flex-col ">
            <div className="flex justify-center items-center">
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                width={250}
                alt=""
              />
              <p className="text-center text-white font-bold text-4xl">
                {weather.main.temp}°C
              </p>
            </div>
            <p className="text-center text-white font-semibold text-2xl">
              {weather.weather[0].main}
            </p>
          </div>
        )}
        <div className="col-span-2">
          {weather && (
            <div className="grid grid-cols-3 gap-6 grid-rows-3">
              <Card
                title={"Wind"}
                text={Number(weather.wind.speed * 3.6).toFixed(2)}
                subtitle={"East"}
              />
              <Card
                title={"Humidity"}
                text={`${weather.main.humidity}%`}
                subtitle={"East"}
              />
              <Card
                title={"Feels Like"}
                text={`${weather.main.temp}°C`}
                subtitle={"East"}
              />
              <Card
                title={"Pressure"}
                text={`${weather.main.pressure}hPa`}
                subtitle={"East"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
