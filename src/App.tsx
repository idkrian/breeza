import { useEffect, useState } from "react";
import Card from "./molecules/Card";
import { CityProps, OpenMeteoProps, WeatherProps } from "./helpers/interfaces";
import {
  getOpenMeteo,
  getOpenWeather,
  getTermOpenWeather,
} from "./services/api";

function App() {
  const [weather, setWeather] = useState<WeatherProps>();
  const [meteo, setMeteo] = useState<OpenMeteoProps>();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<CityProps[]>();
  const [loading, setLoading] = useState(false);
  console.log(weather);

  const getWeather = async () => {
    setLoading(true);
    const weatherData = await getOpenWeather(-79.4163, 43.70011);
    setWeather(weatherData);
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    getDataByCoord(longitude, latitude);
    setLoading(false);
  };
  const getDataByCoord = async (lat: number, lon: number) => {
    const meteoData = await getOpenMeteo(lat, lon);
    setMeteo(meteoData.data);
    const weatherData = await getOpenWeather(lat, lon);
    setWeather(weatherData);
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
  const teste = async (text: string) => {
    const res = await getTermOpenWeather(text);
    console.log(res);
    setCity(res.results);
  };
  // transition-opacity duration-1000 ${ loading ? "opacity-0" : "opacity-100 "}
  return (
    <div
      className={`bg-white rounded-lg flex align-middle justify-center w-fit h-fit
       
       `}
    >
      <div className={`grid grid-cols-2 md:grid-cols-3  }`}>
        {weather && (
          <div className="flex flex-col p-4 col-span-2 md:col-span-1 items-center  relative">
            <input
              type="text"
              placeholder="Toronto, Canada"
              className="bg-lightWhite rounded-3xl p-2 px-4 mt-4 w-11/12"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                teste(e.target.value);
              }}
            />
            {search.length > 2 && city && (
              <div className="overflow-auto bg-white mt-16 h-40 w-5/6 absolute rounded-xl">
                {city.map((e) => (
                  <div
                    onClick={() => {
                      setSearch("");
                      getDataByCoord(e.latitude, e.longitude);
                    }}
                    className="flex cursor-pointer align-middle items-center hover:bg-lightBackground rounded-lg"
                  >
                    <img
                      src={`https://flagsapi.com/${e.country_code}/flat/64.png`}
                    />
                    <h1 className="font-semibold text-xl pl-3">{e.name}</h1>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col justify-center items-center ">
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
            {meteo && (
              <p className="text-center font-semibold text-xl">
                {new Date(meteo.current.time).toLocaleDateString(
                  "en-US",
                  options
                )}
              </p>
            )}
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
