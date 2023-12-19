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
import Autocomplete from "./molecules/Autocomplete";
function App() {
  const [weather, setWeather] = useState<WeatherProps>();
  const [meteo, setMeteo] = useState<OpenMeteoProps>();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<CityProps[]>();
  const [cityName, setCityName] = useState("");
  const [daysForecast, setDaysForecast] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("card");
  const loadImage = () => {
    const img = new Image();
    img.src = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`;
  };
  const getWeather = async () => {
    setLoading(true);
    loadImage();
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

  const PageDisplay = () => {
    if (page === "card") {
      return <WeatherCards weather={weather} meteo={meteo} />;
    } else if (page === "chart") {
      return <Chart daysForecast={daysForecast} />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center align-middle">
        <img src={Loading} className="w-36" />
      </div>
    );
  }
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
              <Autocomplete
                search={search}
                setCityName={setCityName}
                setSearch={setSearch}
                getDataByCoord={getDataByCoord}
                city={city}
              />
              <div className="flex flex-col justify-center items-center ">
                <img
                  className=""
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  width={250}
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
          <div className="col-span-2 bg-lightWhite p-4 rounded-lg flex flex-col relative">
            <div className="flex gap-4 mt-4">
              <p
                onClick={() => setPage("card")}
                className={`text-xl ${
                  page === "card" ? "font-bold" : ""
                } cursor-pointer`}
              >
                Cards
              </p>
              <p
                onClick={() => setPage("chart")}
                className={`text-xl ${
                  page === "chart" ? "font-bold" : ""
                } cursor-pointer`}
              >
                Week Chart
              </p>
            </div>
            {PageDisplay()}
            <p className="font-semibold absolute pt-8 bottom-0 text-xs">
              Made by <span className="text-blue">Rian</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
