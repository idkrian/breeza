import { useEffect, useState } from "react";
import Card from "./molecules/Card";
import { OpenMeteoProps, WeatherProps } from "./helpers/interfaces";
import { getOpenMeteo, getOpenWeather } from "./services/api";

function App() {
  const [weather, setWeather] = useState<WeatherProps>();
  const [meteo, setMeteo] = useState<OpenMeteoProps>();
  const getWeather = async () => {
    const weatherData = await getOpenWeather();
    setWeather(weatherData);
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    const meteoData = await getOpenMeteo(latitude, longitude);
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
                className="bg-lightWhite rounded-3xl p-2 px-4 w-10/12	mt-4"
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
                    text={String(meteo.daily.uv_index_max[0])}
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
