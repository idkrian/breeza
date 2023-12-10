import { useEffect, useState } from "react";
import Card from "./molecules/Card";
import { OpenMeteoProps, WeatherProps } from "./helpers/interfaces";
import { getOpenMeteo, getOpenWeather } from "./services/api";

function App() {
  const [weather, setWeather] = useState<WeatherProps>();
  const [meteo, setMeteo] = useState<OpenMeteoProps>();
  const [loading, setLoading] = useState(false);
  const getWeather = async () => {
    setLoading(true);
    const weatherData = await getOpenWeather();
    setWeather(weatherData);
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    const meteoData = await getOpenMeteo(latitude, longitude);
    setMeteo(meteoData.data);
    setLoading(false);
  };
  useEffect(() => {
    getWeather();
  }, []);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(loading);

  return (
    <div
      className={`bg-white rounded-lg flex align-middle justify-center w-fit h-fit transition-opacity duration-1000 ${
        loading ? "opacity-0" : "opacity-100 "
      }`}
    >
      <div className={`grid grid-cols-2 md:grid-cols-3 }`}>
        {weather && (
          <div className="flex flex-col p-4 col-span-2 md:col-span-1 items-center">
            <input
              type="text"
              placeholder="Toronto, Canada"
              className="bg-lightWhite rounded-3xl p-2 px-4 mt-4 w-11/12"
            />
            <div className="flex flex-col justify-center items-center">
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                width={250}
                alt=""
              />
              <div className="flex">
                <p className="text-6xl">{Math.trunc(weather.main.temp)} </p>
                <span className="text-3xl">°C</span>
              </div>
            </div>
            <p className="text-center font-semibold text-2xl capitalize">
              {weather.weather[0].description}
            </p>
            <div className="border border-lightBackground my-8 w-8/12" />
            {/* <p className="text-center font-semibold text-xl">
              {new Date(meteo?.current?.time).toLocaleDateString(
                "en-US",
                options
              )}
            </p> */}
            <p className="text-center font-semibold text-3xl">{weather.name}</p>
          </div>
        )}
        <div className="col-span-2 bg-lightWhite p-4 rounded-lg">
          {weather && (
            <div
              className={`grid grid-cols-2 gap-6 grid-rows-3 md:grid-cols-3 
                
              
              `}
            >
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
              {meteo && (
                <>
                  <Card
                    title={"UV Index"}
                    text={String(meteo.daily.uv_index_max[0])}
                    subtitle={"East"}
                  />
                  <Card
                    title={"Chance of Rain"}
                    text={`${meteo.daily.precipitation_probability_max[0]}%`}
                    subtitle={"East"}
                  />
                  <Card title={"Snow"} text={`${meteo.current.snowfall}%`} />
                  <Card
                    title={"Cloud Cover"}
                    text={`${meteo.current.cloud_cover}%`}
                  />
                  <Card
                    title={"Sun"}
                    subtitle={new Date(
                      meteo.daily.sunrise[0]
                    ).toLocaleTimeString("en-US")}
                    subtitle2={new Date(
                      meteo.daily.sunset[0]
                    ).toLocaleTimeString("en-US")}
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
