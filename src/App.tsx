import { useEffect, useState } from "react";
import { CityProps, OpenMeteoProps, WeatherProps } from "./helpers/interfaces";
import {
  get7DaysForecast,
  getOpenMeteo,
  getOpenWeather,
  getTermOpenWeather,
} from "./services/api";
import SearchInput from "./molecules/Input";
import Chart from "./templates/Chart";
import WeatherCards from "./templates/WeatherCards";
import Loading from "../src/assets/loading.svg";
function App() {
  const [weather, setWeather] = useState<WeatherProps>();
  const [meteo, setMeteo] = useState<OpenMeteoProps>();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<CityProps[]>();
  const [cityName, setCityName] = useState("");
  const [daysForecast, setDaysForecast] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("card");

  const getWeather = async () => {
    setLoading(true);
    const weatherData = await getOpenWeather(-79.4163, 43.70011);
    setWeather(weatherData);
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    getDataByCoord(longitude, latitude);
    const daysForecastData = await get7DaysForecast(longitude, latitude);
    setDaysForecast(daysForecastData.daily);
    setLoading(false);
  };

  const getDataByCoord = async (lat: number, lon: number) => {
    setLoading(true);
    const meteoData = await getOpenMeteo(lat, lon);
    setMeteo(meteoData.data);
    const weatherData = await getOpenWeather(lat, lon);
    setWeather(weatherData);
    const daysForecastData = await get7DaysForecast(lat, lon);
    setDaysForecast(daysForecastData.daily);
    setLoading(false);
  };
  useEffect(() => {
    getWeather();
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getCity = async (text: string) => {
    const res = await getTermOpenWeather(text);
    setCity(res.results);
  };

  if (loading) {
    return <img src={Loading} alt="" />;
  }
  const PageDisplay = () => {
    if (page === "card") {
      return <WeatherCards weather={weather} meteo={meteo} />;
    } else if (page === "chart") {
      return <Chart daysForecast={daysForecast} />;
    }
  };
  return (
    <div
      className={`bg-white rounded-lg flex align-middle justify-center w-4/5 h-3/4`}
    >
      <div className="w-full h-full">
        <div className={`grid grid-cols-2 md:grid-cols-3 h-full`}>
          {weather && (
            <div className="flex flex-col p-4 col-span-2 md:col-span-1 items-center relative">
              <SearchInput
                setSearch={setSearch}
                search={search}
                getCity={getCity}
              />
              {search.length > 2 && city && (
                <div className="overflow-auto bg-white mt-16 h-40 w-5/6 absolute rounded-xl">
                  {city.map((e) => (
                    <div
                      key={e.country_code}
                      onClick={() => {
                        setCityName(e.name);
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
              <p className="text-center font-semibold text-3xl">
                {cityName === "" ? weather.name : cityName}
              </p>
            </div>
          )}
          <div className="col-span-2 bg-lightWhite p-4 rounded-lg flex flex-col ">
            <div className="flex gap-4 mt-4">
              <p
                onClick={() => setPage("card")}
                className={`text-xl ${
                  page === "card" ? "font-semibold" : ""
                } cursor-pointer`}
              >
                Cards
              </p>
              <p
                onClick={() => setPage("chart")}
                className={`text-xl ${
                  page === "chart" ? "font-semibold" : ""
                } cursor-pointer`}
              >
                Chart
              </p>
            </div>
            {PageDisplay()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
