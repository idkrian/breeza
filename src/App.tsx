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
  const [meteo, setMeteo] = useState();
  const getWeather = async () => {
    const weatherData = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=-15.77&lon=-47.92&units=metric&appid=a84fa02c10f107905f4968c8ec0bea59"
    );
    setWeather(weatherData.data);
    const longitude = weatherData.data.coord.lon;
    const latitude = weatherData.data.coord.lat;
    const meteoData = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,,snowfall,cloud_cover,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,sunshine_duration,uv_index_max,precipitation_sum,precipitation_probability_max,rain_sum&timezone=America%2FSao_Paulo&forecast_days=1`
    );
    console.log(meteoData.data);
    setMeteo(meteoData.data);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="bg-white rounded-lg flex align-middle justify-center w-fit h-fit">
      <div className="grid grid-cols-3">
        {weather && (
          <div className="flex flex-col p-4 ">
            <div className="flex justify-center">
              <input
                type="text"
                name=""
                id=""
                placeholder="Toronto, Canada"
                className="bg-lightWhite rounded-3xl p-2 px-4 w-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                width={250}
                alt=""
              />
              <p className="text-center  font-bold text-6xl">
                {Math.trunc(weather.main.temp)}°C
              </p>
            </div>
            <p className="text-center  font-semibold text-2xl">
              {weather.weather[0].description}
            </p>
            <div className="border my-8" />
            <p className="text-center  font-semibold text-2xl">
              {weather.name}
            </p>
          </div>
        )}
        <div className="col-span-2 bg-lightWhite p-4">
          {weather && (
            <div className="grid grid-cols-3 gap-6 grid-rows-3 ">
              <Card
                title={"Wind"}
                text={Number(weather.wind.speed * 3.6).toFixed(2)}
                subtitle1={"East"}
              />
              <Card
                title={"Humidity"}
                text={`${weather.main.humidity}%`}
                subtitle1={"East"}
              />
              <Card
                title={"Feels Like"}
                text={`${weather.main.temp}°C`}
                subtitle1={"East"}
              />
              <Card
                title={"Pressure"}
                text={`${weather.main.pressure}hPa`}
                subtitle1={"East"}
              />
              {meteo && (
                <>
                  <Card
                    title={"UV Index"}
                    text={meteo.daily.uv_index_max[0]}
                    subtitle1={"East"}
                  />
                  <Card
                    title={"Chance of Rain"}
                    text={`${meteo.daily.precipitation_probability_max[0]}%`}
                    subtitle1={"East"}
                  />
                  <Card title={"Snow"} text={`${meteo.current.snowfall}%`} />
                  <Card
                    title={"Cloud Cover"}
                    text={`${meteo.current.cloud_cover}%`}
                  />
                  <Card
                    title={"Sun"}
                    text={new Date(meteo.daily.sunrise[0]).toLocaleTimeString(
                      "en-US"
                    )}
                    text2={new Date(meteo.daily.sunset[0]).toLocaleTimeString(
                      "en-US"
                    )}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
